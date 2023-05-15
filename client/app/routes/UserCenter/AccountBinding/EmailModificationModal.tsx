import { FC, useRef } from 'react';
import { message, Modal } from 'antd';
import { ProForm, ProFormCaptcha, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { MailOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { CAPTCHA_DIGIT, EMAIL_REGEXP } from '@spotter/utils';
import { useStore } from '@app/store';
import { observer } from 'mobx-react-lite';
import { userSdk } from '@app/services/v2/auth/user';
import { useValidate } from '@client/app/utils/hooks';

interface EmailModificationModalProps {
    visible: boolean;
    onClose(): void;
}
export const EmailModificationModal: FC<EmailModificationModalProps> = observer(
    ({ visible, onClose }) => {
        const formRef = useRef<ProFormInstance>();
        const validate = useValidate();
        const { user, validateCaptcha, updateValidate, loadWatchers } = useStore('global');

        return (
            <Modal
                open={visible}
                confirmLoading={loadWatchers(['validateCaptcha', 'updateValidate'])}
                onCancel={onClose}
                onOk={async () => {
                    formRef.current?.submit();
                }}
                okText="确认"
                title="编辑邮件"
            >
                <ProForm
                    submitter={{
                        render: false,
                    }}
                    formRef={formRef}
                    onFinish={async (values) => {
                        const res = await validateCaptcha({
                            mail: values.email,
                            captcha: values.captcha?.trim(),
                        });
                        if (res.data) {
                            await updateValidate({
                                id: user.data.id,
                                email: values.email?.trim(),
                            });
                            message.success('成功');
                            // getCurrentUser();
                            validate.get();
                            onClose();
                        } else {
                            message.error('验证码不正确');
                        }
                    }}
                >
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
                        validateFirst
                        placeholder="输入新邮箱"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的新邮箱',
                            },
                            {
                                pattern: EMAIL_REGEXP,
                                message: '请核实您的邮箱',
                            },
                            {
                                validator: async (_, value) => {
                                    if (value === user.data.email) {
                                        throw new Error('新邮箱需要和旧邮箱不同');
                                    }
                                },
                            },
                            {
                                validator: async (_, value) => {
                                    if (!EMAIL_REGEXP.test(value?.trim())) {
                                        return;
                                    }
                                    const { data: res } = await userSdk.userExisted({
                                        mail: value?.trim(),
                                    });

                                    if (res.data) {
                                        throw new Error('邮件已绑定');
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
                        validateFirst
                        placeholder={`输入 ${CAPTCHA_DIGIT} 位验证码`}
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
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                        phoneName="email"
                        onGetCaptcha={async (email) => {
                            if (email?.trim()) {
                                try {
                                    await userSdk.sendEmailCaptcha({ mail: email?.trim() });
                                    return;
                                } catch (error: any) {
                                    message.error(error.data?.msg);
                                    throw error;
                                }
                            }
                        }}
                    />
                </ProForm>
            </Modal>
        );
    },
);
