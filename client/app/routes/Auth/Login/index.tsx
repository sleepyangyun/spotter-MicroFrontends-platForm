import { useState } from 'react';
import { LoginForm as ProLoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { Button, Divider, message, Space, Tabs, Tooltip } from 'antd';
import {
    LockOutlined,
    MailOutlined,
    MobileOutlined,
    SafetyCertificateOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { BrandName } from '@app/components/Brand';
import { userSdk } from '@app/services/v2/auth/user';
import { AccountType } from '@app/types/enum';
import { applicationBootData } from '@client/app/utils/const';
import {
    CAPTCHA_DIGIT,
    EMAIL_REGEXP,
    encodeUnicode2Base64,
    LOGIN_PASSWORD_REGEXP,
    PHONE_REGEXP,
} from '@spotter/utils';
import { useSt } from '@spotter/i18n-sdk';

export default function Login() {
    const [accountType, setAccountType] = useState<AccountType>(AccountType.EMAIL);
    const navigate = useNavigate();
    const t = useSt();

    return (
        <div className="flex flex-col h-full overflow-auto">
            <ProLoginForm
                onFinish={async (data) => {
                    try {
                        await userSdk.login(
                            accountType === AccountType.EMAIL
                                ? {
                                      email: data.email.trim(),
                                      password: encodeUnicode2Base64(data.password?.trim()),
                                  }
                                : {
                                      phone: data.phone.trim(),
                                      captcha: data.captcha.trim(),
                                  },
                        );

                        // 重定向到用户登陆前地址
                        const pathName = window.localStorage.getItem('PATHNAME_BEFORE_LOGIN');
                        window.localStorage.setItem('PATHNAME_BEFORE_LOGIN', '');
                        navigate(pathName || '/');
                    } catch (error: any) {
                        if (!error.data.data) {
                            message.error(error.data.msg);
                        }
                    }
                }}
                submitter={{
                    searchConfig: {
                        submitText: t('auth.log_in', 'Log In'),
                    },
                    submitButtonProps: {
                        size: 'large',
                        style: {
                            width: '100%',
                        },
                    },
                }}
            >
                <div className="flex flex-col justify-center items-start mb-12px">
                    <div className="text-24px font-500 flex items-baseline">
                        {t('auth.log_in_to', 'Log in to')}
                        <BrandName className="h-16px ml-6px" color="#000" />
                    </div>
                </div>
                <Tabs
                    className="spotter-login-form-tabs"
                    centered={false}
                    activeKey={accountType.toString()}
                    onChange={(activeKey: string) => setAccountType(+activeKey as AccountType)}
                >
                    <Tabs.TabPane key={AccountType.EMAIL} tab={t('auth.login_in_with_account')} />
                    <Tabs.TabPane key={AccountType.PHONE} tab={t('common.phone_number')} />
                </Tabs>
                {+accountType === AccountType.EMAIL && (
                    <>
                        <ProFormText
                            name="email"
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <span className="text-gray-500/85 flex items-center">
                                        <MailOutlined className="prefixIcon" />
                                    </span>
                                ),
                            }}
                            placeholder={t('auth.email_input_placeholder', 'Enter email')}
                            rules={[
                                {
                                    validator: async (_, value?: string) => {
                                        if (!value?.trim()) {
                                            throw new Error(t('auth.email_required'));
                                        }
                                        return true;
                                    },
                                    validateTrigger: 'onChange',
                                },
                                {
                                    pattern: EMAIL_REGEXP,
                                    message: t(
                                        'auth.email_format_invalid',
                                        'Please verify your email.',
                                    ),
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <span className="text-gray-500/85 flex items-center">
                                        <LockOutlined className="prefixIcon" />
                                    </span>
                                ),
                            }}
                            placeholder={t('auth.password_input_placeholder', 'Enter password')}
                            rules={[
                                {
                                    validator: async (_, value?: string) => {
                                        if (!value?.trim()) {
                                            throw new Error(t('auth.password_required'));
                                        }
                                    },
                                    validateTrigger: 'onChange',
                                },
                                {
                                    pattern: LOGIN_PASSWORD_REGEXP,
                                    message: t(
                                        'auth.password_format_invalid',
                                        'Password must be composed of 6-12 letters and numbers.',
                                    ),
                                },
                            ]}
                        />
                    </>
                )}
                {+accountType === AccountType.PHONE && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <span className="text-gray-500/85 flex items-center">
                                        <MobileOutlined className="prefixIcon" />
                                    </span>
                                ),
                            }}
                            name="phone"
                            placeholder={t('auth.phone_input_placeholder', 'Enter phone number.')}
                            validateFirst
                            rules={[
                                {
                                    validator: async (_, value?: string) => {
                                        if (!value?.trim()) {
                                            throw new Error(t('auth.phone_required'));
                                        }
                                    },
                                    validateTrigger: 'onChange',
                                },
                                {
                                    pattern: PHONE_REGEXP,
                                    message: t(
                                        'auth.phone_format_invalid',
                                        'Please verify your phone number.',
                                    ),
                                },
                                {
                                    validator: async (_, phone) => {
                                        const { data: res } = await userSdk.userExisted({
                                            phone: phone?.trim(),
                                        });

                                        if (!res.data) {
                                            throw new Error(
                                                t('auth.phone_not_existed', 'Phone not existed.'),
                                            );
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
                                        <SafetyCertificateOutlined className="prefixIcon" />
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
                                const getCodeTxt = '获取验证码';
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
                            phoneName="phone"
                            onGetCaptcha={async (phone) => {
                                if (phone?.trim()) {
                                    await userSdk.sendPhoneCaptcha({ phone: phone?.trim() });
                                }
                            }}
                        />
                    </>
                )}
                <div className="flex items-center justify-end" style={{ marginBottom: 24 }}>
                    <a
                        onClick={() => {
                            navigate('/forgot-password');
                        }}
                        style={{
                            float: 'right',
                        }}
                    >
                        {t('auth.forgot_password', 'Forgot your password?')}
                    </a>
                </div>
            </ProLoginForm>
            <div className="w-328px my-12px mx-auto">
                <Divider plain>
                    <span className="text-gray-500/85 ">更多方式</span>
                </Divider>
                <Space className="flex justify-center w-full" size={24}>
                    <Tooltip title="飞书">
                        <Button
                            onClick={() => {
                                window.location.assign(applicationBootData?.app?.larkUrl ?? '');
                            }}
                            style={{ padding: 12, width: 48, height: 48 }}
                            shape="circle"
                            icon={
                                <svg
                                    className="authing-js-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 1024 1024"
                                >
                                    <g fill="rgb(18.431373%,32.941176%,92.156863%)">
                                        <path d="M933.875 98.5625L726.53414917 322.64486695a6.61651612 6.61651612 0 0 0-1.64300537 5.81726073 40.54449463 40.54449463 0 0 1-68.92053223 36.37023927L490.72827148 530.02856445l16.29821778 218.30960083L692.5625 933.875z m0 0" />
                                        <path d="M931.6098938 104.2026062l-205.12023926 221.68377685a6.61651612 6.61651612 0 0 0-1.64300537 5.86175538 39.96688843 39.96688843 0 0 1-68.21026612 35.92611694L494.23675537 530.07388305a3.28601074 3.28601074 0 0 0-0.93273925 2.53125l16.03125 214.40148927 413.61547851-623.97537232 8.88162232-18.74047852z m0 0" />
                                        <path d="M925.48199463 90.16949463L701.39880372 297.46502685a6.61651612 6.61651612 0 0 1-5.86175538 1.68832398 40.54449463 40.54449463 0 0 0-36.32574462 68.92053222L493.97143555 533.31622315l-218.22143555-16.43005372L90.125 331.43667602z m0 0" />
                                        <path d="M919.8427124 92.65625l-221.77359008 205.12023926a6.61651612 6.61651612 0 0 1-5.77276612 1.64300537 39.96688843 39.96688843 0 0 0-35.92611695 68.21026612L493.92611695 530.02938843a3.28601074 3.28601074 0 0 1-2.57574463 0.93273925l-214.40148927-16.03125L900.96875 101.31539917l18.74047852-8.88079834z m0 0" />
                                    </g>
                                </svg>
                            }
                        />
                    </Tooltip>
                    <Tooltip title="钉钉">
                        <Button
                            onClick={() => {
                                // @ts-ignore
                                window.location.assign(applicationBootData?.app?.dingUrl ?? '');
                            }}
                            style={{ padding: 12, width: 48, height: 48 }}
                            shape="circle"
                            icon={
                                <svg
                                    viewBox="60 53 240 240"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M264.848 172.094C222.63 139.507 175.027 96.337 122.844 50.0498C118.729 46.4012 115.08 47.8341 113.248 52.6792C101.495 83.7293 112.886 111.301 131.302 127.202C149.8 143.163 177.295 157.854 194.138 165.653C194.795 165.956 194.219 166.916 193.554 166.628C162.617 152.994 141.098 143.156 111.911 120.651C108.764 118.229 105.58 119.167 105.203 123.901C102.817 153.577 121.81 176.887 143.018 184.775C156.138 189.65 170.491 192.346 183.803 193.956C184.497 194.037 184.342 195.064 183.648 195.071C166.487 195.123 145.759 191.016 127.823 184.118C124.033 182.663 122.726 185.691 123.309 188.084C126.368 200.618 141.888 219.792 166.583 223.824C171.2 224.578 176.12 224.674 180.508 224.541C181.55 224.511 181.801 225.087 181.469 225.892C181.469 225.892 164.685 254.631 163.954 255.857C163.385 256.809 163.732 257.578 164.921 257.578C166.118 257.578 186.041 257.578 187.061 257.578C188.08 257.578 188.716 258.242 188.191 259.106C187.667 259.978 158.627 308.119 157.253 310.423C156.057 312.418 157.468 313.946 159.713 312.307C161.959 310.667 254.757 242.739 257.409 240.797C258.621 239.903 258.333 238.699 256.626 238.699C254.927 238.699 238.062 238.699 236.769 238.699C235.477 238.699 235.196 237.828 236.075 236.949C236.961 236.063 258.606 214.496 266.296 206.423C274.311 197.996 278.404 182.559 264.848 172.094Z"
                                        fill="#007FFF"
                                    />
                                </svg>
                            }
                        />
                    </Tooltip>
                </Space>
            </div>
        </div>
    );
}
