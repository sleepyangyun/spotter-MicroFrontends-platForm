import { useState } from 'react';
import { LoginForm as ProLoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import {
    ArrowLeftOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import {
    CAPTCHA_DIGIT,
    SIGNUP_PASSWORD_REGEXP,
    EMAIL_REGEXP,
    PHONE_REGEXP,
    encodeUnicode2Base64,
} from '@spotter/utils';
import { AccountType } from '@spotter/api-sdk/lib/domain/auth';
import { useSt } from '@spotter/i18n-sdk';
import { userSdk } from '@app/services/v2/auth/user';
import { message } from 'antd';

function PasswordForgot() {
    const t = useSt();
    const navigate = useNavigate();
    const [loginLoading, setLoginLoading] = useState(false);
    return (
        <ProLoginForm
            onFinish={async (data) => {
                try {
                    setLoginLoading(true);
                    await userSdk.changePassword({
                        account: data.account.trim(),
                        password: encodeUnicode2Base64(data.password.trim()),
                        captcha: data.captcha.trim(),
                        type: PHONE_REGEXP.test(data.account)
                            ? AccountType.PHONE
                            : AccountType.EMAIL,
                    } as any);
                    navigate('/forgot-password/completion');
                } catch (error: any) {
                    message.error(error?.data?.msg);
                } finally {
                    setLoginLoading(false);
                }
            }}
            submitter={{
                searchConfig: {
                    submitText: t('common.action_confirm'),
                },
                // render: (_, dom) => dom.pop(),
                submitButtonProps: {
                    size: 'large',
                    style: {
                        width: '100%',
                    },
                    loading: loginLoading,
                },
            }}
            actions={
                <Link to="/login" className="text-14px flex items-center justify-end">
                    <ArrowLeftOutlined className="mr-6px" />
                    {t('common.action_back')}
                </Link>
            }
        >
            <div className="flex flex-col justify-center items-start mb-24px">
                <div className="text-24px font-500 flex  flex-col items-baseline">
                    {t('auth.reset_password')}
                </div>
            </div>
            <ProFormText
                name="account"
                fieldProps={{
                    size: 'large',
                    prefix: (
                        <span className="text-gray-500/85 flex items-center">
                            <UserOutlined className="mr-4px" />
                        </span>
                    ),
                }}
                placeholder={t('auth.email_or_phone_input_placeholder')}
                rules={[
                    {
                        validator: async (_, value?: string) => {
                            if (!value?.trim()) {
                                throw new Error(t('auth.email_or_phone_required'));
                            }
                        },
                        validateTrigger: 'onChange',
                    },
                    {
                        validator: async (_, value) => {
                            if (
                                value === '' ||
                                EMAIL_REGEXP.test(value) ||
                                PHONE_REGEXP.test(value)
                            ) {
                                return;
                            }
                            throw new Error(t('auth.email_or_phone_format_invalid'));
                        },
                    },
                    {
                        validator: async (_, value) => {
                            const { data: res } = await userSdk.userExisted(
                                EMAIL_REGEXP.test(value?.trim())
                                    ? {
                                          mail: value?.trim(),
                                      }
                                    : {
                                          phone: value?.trim(),
                                      },
                            );

                            if (!res.data) {
                                throw new Error(t('auth.user_not_existed'));
                            }
                        },
                        validateTrigger: 'onGetCaptcha',
                    },
                ]}
            />
            <ProFormCaptcha
                fieldProps={{
                    size: 'large',
                    prefix: (
                        <span className="text-gray-500/85 flex items-center">
                            <SafetyCertificateOutlined className="mr-4px" />
                        </span>
                    ),
                }}
                captchaProps={{
                    size: 'large',
                }}
                placeholder={t('auth.captcha_input_placeholder', {
                    digit: CAPTCHA_DIGIT,
                })}
                captchaTextRender={(timing, count) => {
                    const getCodeTxt = t('auth.get_captcha');
                    if (timing) {
                        return `${count}s ${getCodeTxt}`;
                    }
                    return getCodeTxt;
                }}
                name="captcha"
                rules={[
                    {
                        validator: async (_, value?: string) => {
                            if (!value?.trim()) {
                                throw new Error(t('auth.captcha_required'));
                            }
                        },
                        validateTrigger: 'onChange',
                    },
                ]}
                phoneName="account"
                onGetCaptcha={async (account) => {
                    try {
                        if (account?.trim()) {
                            PHONE_REGEXP.test(account?.trim()) &&
                                (await userSdk.sendPhoneCaptcha({ phone: account?.trim() }));
                            EMAIL_REGEXP.test(account) &&
                                (await userSdk.sendEmailCaptcha({ mail: account?.trim() }));
                        }
                    } catch (error: any) {
                        throw new Error(error);
                    }
                }}
            />
            <ProFormText.Password
                name="password"
                fieldProps={{
                    size: 'large',
                    prefix: (
                        <span className="text-gray-500/85 flex items-center">
                            <LockOutlined className="mr-4px" />
                        </span>
                    ),
                }}
                placeholder={t('auth.new_password_input_placeholder')}
                rules={[
                    {
                        validator: async (_, value?: string) => {
                            if (!value?.trim()) {
                                throw new Error(t('auth.new_password_required'));
                            }
                        },
                        validateTrigger: 'onChange',
                    },
                    {
                        pattern: SIGNUP_PASSWORD_REGEXP,
                        message: t('auth.password_format_invalid'),
                    },
                ]}
            />
        </ProLoginForm>
    );
}

export default PasswordForgot;
