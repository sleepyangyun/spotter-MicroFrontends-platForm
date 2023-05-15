import { FC, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { CaptchaCode } from '@app/components/CaptchaCode';
import { CAPTCHA_DIGIT } from '@spotter/utils';
import { userSdk } from '@app/services/v2/auth/user';
import { SmsSendingStatus } from '../consts';

interface SendCodeFormProps {
    onFinish(captcha: string): void;
    phone: string | number;
    initStatus?: SmsSendingStatus;
    back(): void;
}

const SmsCodeSendMinInterval = 60; // s

export const VerificationCodeForm: FC<SendCodeFormProps> = ({
    onFinish,
    phone,
    back,
    initStatus,
}) => {
    const [sendingStatus, setSendingStatus] = useState(initStatus || SmsSendingStatus.READY);
    const [resendableTime, setResendableTime] = useState(SmsCodeSendMinInterval);

    const timer = useRef(0);

    useEffect(() => {
        if (sendingStatus === SmsSendingStatus.SENT) {
            if (!timer.current) {
                timer.current = setInterval(() => {
                    setResendableTime((origin) => --origin);
                }, 1000) as any;
            }
        } else {
            clearInterval(timer.current);
            timer.current = 0;
            setResendableTime(SmsCodeSendMinInterval);
        }
    }, [sendingStatus, resendableTime]);

    useEffect(() => {
        if (resendableTime === 0) {
            setSendingStatus(SmsSendingStatus.READY);
        }
    }, [resendableTime]);

    const getNewCode = async () => {
        try {
            await userSdk.sendPhoneCaptcha({ phone: phone.toString() });
            setSendingStatus(SmsSendingStatus.SENT);
        } catch {}
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-360px">
                <div className="flex flex-col justify-center items-start mb-24px">
                    <div className="text-24px font-500 flex  flex-col items-baseline">
                        请确认您的手机号码
                    </div>
                    <div className="text-16px text-gray-600/60 mt-12px">
                        <strong key="dummy">{CAPTCHA_DIGIT}</strong>
                        {`位短信验证码已发送到您的手机 ${phone}，请注意接收。`}
                    </div>
                </div>
                <CaptchaCode
                    onFinish={async (captcha) => {
                        try {
                            const { data: res } = await userSdk.validateCaptcha({
                                phone: phone as string,
                                captcha: captcha?.trim(),
                            });
                            if (!res.data) {
                                return false;
                            }
                            onFinish(captcha);
                            return res.data;
                        } catch {
                            return false;
                        }
                    }}
                />
                <Button
                    disabled={sendingStatus === SmsSendingStatus.SENT}
                    onClick={() => {
                        getNewCode();
                    }}
                    className="mt-24px"
                    block
                    size="large"
                    type="primary"
                >
                    {sendingStatus === SmsSendingStatus.SENT ? (
                        <span className="mr-6px">{resendableTime}s</span>
                    ) : null}
                    获取新代码
                </Button>
                <div className="mt-24px">
                    <a
                        onClick={() => {
                            back();
                        }}
                        style={{
                            float: 'right',
                        }}
                    >
                        使用另一个手机号码
                    </a>
                </div>
            </div>
        </div>
    );
};
