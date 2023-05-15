import { FC, useState } from 'react';
import { SendCodeForm } from '@app/routes/Auth/AccountActivation/PhoneVerification/SendCodeForm';
import { VerificationCodeForm } from '@app/routes/Auth/AccountActivation/PhoneVerification/VerficationCodeForm';
import { SmsSendingStatus } from '../consts';

interface PhoneVerificationProps {
    onFinish(data: { phone: string; captcha: string }): void;
}

export const PhoneVerification: FC<PhoneVerificationProps> = ({ onFinish }) => {
    const [steps, setStep] = useState(0);
    const [phone, setPhone] = useState('');
    return (
        <div className="h-full">
            {steps === 0 ? (
                <SendCodeForm
                    onFinish={(pn: string) => {
                        setPhone(pn);
                        setStep(1);
                    }}
                />
            ) : null}
            {steps === 1 ? (
                <VerificationCodeForm
                    phone={phone}
                    onFinish={(captcha) => {
                        onFinish({
                            phone,
                            captcha,
                        });
                    }}
                    initStatus={SmsSendingStatus.SENT}
                    back={() => {
                        setStep(0);
                    }}
                />
            ) : null}
        </div>
    );
};
