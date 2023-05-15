import { FC, useRef } from 'react';
import { message, Modal } from 'antd';
import { ProForm, ProFormCaptcha, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { MobileOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { CAPTCHA_DIGIT, PHONE_REGEXP } from '@spotter/utils';
import { observer } from 'mobx-react-lite';
import { useStore } from '@app/store';
import { userSdk } from '@app/services/v2/auth/user';
import { useValidate } from '@client/app/utils/hooks';

interface PhoneModificationModalProps {
    visible: boolean;
    onClose(): void;
}

const PhoneModificationModal: FC<PhoneModificationModalProps> = observer(({ visible, onClose }) => {
    const formRef = useRef<ProFormInstance>();
    const validate = useValidate();
    const { user, validateCaptcha, updateValidate, loadWatchers } = useStore('global');

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            confirmLoading={loadWatchers(['validateCaptcha', 'updateValidate'])}
            onOk={async () => {
                formRef.current?.submit();
            }}
            okText="确认"
            title="编辑手机号码"
        >
            <ProForm
                submitter={{
                    render: false,
                }}
                formRef={formRef}
                onFinish={async (values) => {
                    const res = await validateCaptcha({
                        phone: values.phone?.trim(),
                        captcha: values.captcha?.trim(),
                    });
                    if (res.data) {
                        await updateValidate({
                            id: user.data?.id,
                            phone: values.phone?.trim(),
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
                    fieldProps={{
                        size: 'large',
                        prefix: (
                            <span className="text-gray-500/85 flex items-center">
                                <MobileOutlined className="prefixIcon" />
                            </span>
                        ),
                    }}
                    name="phone"
                    placeholder="输入新电话号码"
                    validateFirst
                    rules={[
                        {
                            required: true,
                            message: '请输入你的新电话号码',
                        },
                        {
                            pattern: PHONE_REGEXP,
                            message: '请核实你的电话号码',
                        },
                        {
                            validator: async (_, value) => {
                                if (value === user.data?.phone) {
                                    throw new Error('新的电话号码需要和旧的号码不同');
                                }
                            },
                        },
                        {
                            validator: async (_, value) => {
                                const { data: res } = await userSdk.userExisted({
                                    phone: value?.trim(),
                                });

                                if (res.data) {
                                    throw new Error('手机已绑定');
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
                    phoneName="phone"
                    onGetCaptcha={async (phone) => {
                        if (phone?.trim()) {
                            await userSdk.sendPhoneCaptcha({ phone: phone?.trim() });
                        }
                    }}
                />
            </ProForm>
        </Modal>
    );
});

export default PhoneModificationModal;
