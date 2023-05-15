import { Steps, Alert, List, Spin } from 'antd';
import { PhoneVerification } from '@app/routes/Auth/AccountActivation/PhoneVerification';
import { PasswordConfirmation } from '@app/routes/Auth/AccountActivation/PasswordConfirmation';
import { useState } from 'react';
import { RegistrationCompletion } from '@app/routes/Auth/AccountActivation/RegistrationCompletion';
import { useSearchParams } from 'react-router-dom';
import { useMount } from '@spotter/utils';
import { userSdk } from '@app/services/v2/auth/user';
import { useSt } from '@spotter/i18n-sdk';

const { Step } = Steps;

enum AccountActivationStep {
    PHONE_VERIFICATION,
    PASSWORD_CONFIRMATION,
    REGISTRATION_COMPLETION,
}

function AccountActivation() {
    const t = useSt();
    const [step, setStep] = useState(AccountActivationStep.PHONE_VERIFICATION);
    const [params] = useSearchParams();
    const [invitedUser, setInvitedUser] = useState<any | null>(null);
    const [verification, setVerification] = useState({
        phone: '',
        captcha: '',
    });
    const [loading, setLoading] = useState(!!params.get('sign'));

    useMount(async () => {
        if (params.get('sign')) {
            setLoading(true);
            userSdk
                .userRegisterMailCheck({ sign: params.get('sign')! })
                .then(({ data: res }) => {
                    setInvitedUser(res.data);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    });

    const canActivated = loading || (params.get('sign') && invitedUser);
    return (
        <div className="h-full">
            <Steps
                size="default"
                progressDot
                current={step}
                responsive
                status={!canActivated ? 'wait' : 'process'}
                className="fixed top-36px"
                style={{ padding: 48 }}
            >
                <Step title={t('auth.phone_verification')} />
                <Step title={t('auth.password_confirmation_required')} />
                <Step title={t('auth.register_success', 'Registration completion')} />
            </Steps>
            {loading ? (
                <div className="flex justify-center mb-64px">
                    <Alert
                        className="w-328px mx-auto"
                        type="info"
                        message={
                            <h3>
                                {t(
                                    'auth.sign_code_verifying',
                                    'Verifying your invitation code, please wait a moment.',
                                )}
                            </h3>
                        }
                        showIcon
                        icon={
                            <Spin style={{ display: 'flex', margin: '0 24px 0 12px' }} spinning />
                        }
                    />
                </div>
            ) : !canActivated ? (
                <div className="flex justify-center mb-64px">
                    <Alert
                        className="w-328px mx-auto"
                        type="error"
                        message={
                            <h3>
                                {t(
                                    'auth.no_sign_code',
                                    'Invalid invitation code, maybe caused by following reasons:',
                                )}
                            </h3>
                        }
                        description={
                            <List>
                                <List.Item>
                                    {t(
                                        'auth.no_sign_code_reason_1',
                                        '1. You visited the page directly without the invitation email, we can not recognize your invitation code.',
                                    )}
                                </List.Item>
                                <List.Item>
                                    {t(
                                        'auth.no_sign_code_reason_2',
                                        '2. Your invitation code is no longer valid.',
                                    )}
                                </List.Item>
                            </List>
                        }
                    />
                </div>
            ) : (
                <>
                    {step === AccountActivationStep.PHONE_VERIFICATION ? (
                        <PhoneVerification
                            onFinish={(data) => {
                                setVerification(data);
                                setStep(AccountActivationStep.PASSWORD_CONFIRMATION);
                            }}
                        />
                    ) : null}
                    {step === AccountActivationStep.PASSWORD_CONFIRMATION ? (
                        <PasswordConfirmation
                            verification={verification}
                            sign={params.get('sign') || ''}
                            onFinish={() => {
                                setStep(AccountActivationStep.REGISTRATION_COMPLETION);
                            }}
                        />
                    ) : null}
                    {step === AccountActivationStep.REGISTRATION_COMPLETION ? (
                        <RegistrationCompletion />
                    ) : null}
                </>
            )}
        </div>
    );
}

export default AccountActivation;
