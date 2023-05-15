import { ProForm, ProFormText } from '@ant-design/pro-components';
import { LockOutlined } from '@ant-design/icons';
import { FC, useState } from 'react';
import { SIGNUP_PASSWORD_REGEXP, encodeUnicode2Base64 } from '@spotter/utils';
import { useSt } from '@spotter/i18n-sdk';
import { userSdk } from '@app/services/v2/auth/user';
import { message } from 'antd';

interface PasswordConfirmationProps {
    onFinish(): void;
    sign: string;
    verification: {
        phone: string;
        captcha: string;
    };
}
export const PasswordConfirmation: FC<PasswordConfirmationProps> = ({
    onFinish,
    sign,
    verification,
}) => {
    const t = useSt();
    const [loginLoading, setLoginLoading] = useState(false);
    return (
        <div className="flex justify-center items-center">
            <ProForm
                className="w-360px"
                onFinish={async (data) => {
                    try {
                        setLoginLoading(true);
                        await userSdk.initPassword({
                            sign,
                            captcha: verification.captcha,
                            password: encodeUnicode2Base64(data.password.trim()),
                            phone: verification.phone,
                        });
                        onFinish();
                    } catch (error: any) {
                        error?.data?.msg && message.error(error.data.msg);
                    } finally {
                        setLoginLoading(false);
                    }
                }}
                submitter={{
                    searchConfig: {
                        submitText: t('common.action_confirm', 'Confirm'),
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
            >
                <div className="flex flex-col justify-center items-start mb-24px">
                    <div className="text-24px font-500 flex  flex-col items-baseline">
                        {t('auth.password_confirmation_required')}
                    </div>
                </div>
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
                    placeholder={t('auth.password_input_placeholder')}
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
                            pattern: SIGNUP_PASSWORD_REGEXP,
                            message: t(
                                'auth.password_format_invalid',
                                'Password must be composed of 6-12 letters and numbers.',
                            ),
                        },
                    ]}
                />
                <ProFormText.Password
                    name="passwordConfirmation"
                    dependencies={['password']}
                    fieldProps={{
                        size: 'large',
                        prefix: (
                            <span className="text-gray-500/85 flex items-center">
                                <LockOutlined className="prefixIcon" />
                            </span>
                        ),
                    }}
                    placeholder={t(
                        'auth.confirmation_password_input_placeholder',
                        'Confirm password',
                    )}
                    rules={[
                        {
                            validator: async (_, value?: string) => {
                                if (!value?.trim()) {
                                    throw new Error(t('auth.password_confirmation_required'));
                                }
                            },
                            validateTrigger: 'onChange',
                        },
                        {
                            pattern: SIGNUP_PASSWORD_REGEXP,
                            message: t(
                                'auth.password_format_invalid',
                                'Password must be composed of 6-12 letters and numbers.',
                            ),
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        t(
                                            'auth.password_confirmation_equal_required',
                                            'The two passwords that you entered do not match.',
                                        ),
                                    ),
                                );
                            },
                        }),
                    ]}
                />
            </ProForm>
        </div>
    );
};
