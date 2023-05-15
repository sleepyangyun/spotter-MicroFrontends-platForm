import { ProFormText, LoginForm as ProLoginForm } from '@ant-design/pro-components';
import { MobileOutlined } from '@ant-design/icons';
import { PHONE_REGEXP } from '@spotter/utils';
import { FC, useState } from 'react';
import { useSt } from '@spotter/i18n-sdk';
import { userSdk } from '@app/services/v2/auth/user';

interface SendCodeFormProps {
    onFinish(phone: string): void;
}

export const SendCodeForm: FC<SendCodeFormProps> = ({ onFinish }) => {
    const t = useSt();
    const [loading, setLoading] = useState(false);

    return (
        <ProLoginForm
            onFinish={async (data) => {
                onFinish(data.phone.trim());
                try {
                    setLoading(true);
                    await userSdk.sendPhoneCaptcha({
                        phone: data.phone.trim(),
                    });
                } finally {
                    setLoading(false);
                }
            }}
            submitter={{
                searchConfig: {
                    submitText: t('auth.get_captcha'),
                },
                // render: (_, dom) => dom.pop(),
                submitButtonProps: {
                    size: 'large',
                    style: {
                        width: '100%',
                    },
                    loading,
                },
            }}
        >
            <div className="flex flex-col justify-center items-start mb-24px">
                <div className="text-24px font-500 flex  flex-col items-baseline">
                    请确认您的手机号码
                </div>
            </div>

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
                        message: t('auth.phone_format_invalid', 'Please verify your phone number.'),
                    },
                    {
                        validateTrigger: 'onFinish',
                        async validator(_, phone) {
                            setLoading(true);
                            const { data: res } = await userSdk.userExisted({
                                phone: phone?.trim(),
                            });
                            setLoading(false);
                            if (!res.data) {
                                return;
                            }
                            throw new Error(
                                t('auth.phone_being_used', 'The phone number has been used.'),
                            );
                        },
                    },
                ]}
            />
        </ProLoginForm>
    );
};
