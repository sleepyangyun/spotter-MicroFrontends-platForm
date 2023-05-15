import { Button, Card, Divider, message } from 'antd';
import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { ProFormInstance } from '@ant-design/pro-components';
import { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@app/store';
import { UserCenterNavKey } from '@app/routes/UserCenter/const';
import { useSt } from '@spotter/i18n-sdk';
import { GridForm, GridFormItem } from '@app/components/GridForm';
import { userSdk } from '@app/services/v2/auth/user';
import { useMount } from '@spotter/utils';
import { useValidate } from '@client/app/utils/hooks';

enum PersonalInformationMode {
    EDITABLE,
    READONLY,
}

interface PersonalInformationProps {
    navigate(key: UserCenterNavKey): void;
}

const PersonalInformation: FC<PersonalInformationProps> = observer(({ navigate }) => {
    const t = useSt();
    const [mode, setMode] = useState(PersonalInformationMode.READONLY);
    const formRef = useRef<ProFormInstance>();
    const validate = useValidate();
    const { company, user, loadWatchers } = useStore('global');
    const [loading, setLoading] = useState(false);

    const { countryCodeAndName, getCountryCodeAndName } = useStore('tenant');
    const [countryCodeMap, setCountryCodeMap] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        if (countryCodeAndName.data) {
            setCountryCodeMap(
                Object.keys(countryCodeAndName.data).map((key) => ({
                    value: countryCodeAndName.data[key],
                    label: key,
                })),
            );
        }
    }, [countryCodeAndName.data]);

    useMount(() => {
        getCountryCodeAndName();
    });

    const formData = [
        { name: 'name', value: user.data?.name },
        { name: 'id', value: user.data?.id },
        {
            name: 'email',
            value: user.data?.email,
        },
        {
            name: 'phone',
            value: user.data?.phone,
        },
        {
            name: 'company',
            value: company?.data?.name,
        },
        {
            name: 'country',
            value: company?.data?.countryCode,
        },
    ];

    const formItems: GridFormItem[] = [
        {
            name: 'id',
            label: t('user.id'),
            readonly: true,
        },
        {
            name: 'name',
            label: t('user.user_name'),
            readonly: mode === PersonalInformationMode.READONLY,
            rules: [
                {
                    validator: async (_: any, value?: string) => {
                        if (!value?.trim()) {
                            throw new Error(t('user.name_input_placeholder'));
                        }
                    },
                    validateTrigger: 'onChange',
                },
            ],
        },
        {
            name: 'email',
            label: t('auth.email'),
            readonly: true,
            tooltip: (
                <span>
                    {t('user.email_modification_help')}
                    <span
                        onClick={() => {
                            navigate(UserCenterNavKey.ACCOUNT_BINDING);
                        }}
                        className="text-blue-400 cursor-pointer px-4px"
                    >
                        {t('user.account_binding')}
                    </span>
                </span>
            ),
        },
        {
            name: 'phone',
            label: t('common.phone_number'),
            readonly: true,
            tooltip: (
                <span>
                    {t('user.phone_modification_help')}
                    <span
                        onClick={() => {
                            navigate(UserCenterNavKey.ACCOUNT_BINDING);
                        }}
                        className="text-blue-400 cursor-pointer px-4px"
                        style={
                            {
                                // color: 'var(--primary-color)'
                            }
                        }
                    >
                        {t('user.account_binding')}
                    </span>
                </span>
            ),
        },
        {
            label: t('user.country'),
            name: 'country',
            type: 'enum',
            readonly: true,
            options: countryCodeMap,
        },
        {
            name: 'company',
            label: t('user.company'),
            readonly: true,
        },
    ];

    return (
        <Card
            title={
                <h3 className="mb-0 text-16px" style={{ lineHeight: 'inherit' }}>
                    {t('user.basic_information')}
                </h3>
            }
            className="h-full"
            extra={
                mode === PersonalInformationMode.READONLY ? (
                    <Button
                        icon={<EditOutlined style={{ display: 'flex', alignItems: 'center' }} />}
                        type="link"
                        onClick={() => {
                            setMode(PersonalInformationMode.EDITABLE);
                        }}
                    >
                        {t('common.action_edit')}
                    </Button>
                ) : (
                    <div className="flex items-center">
                        <Button
                            type="link"
                            onClick={() => {
                                setMode(PersonalInformationMode.READONLY);
                            }}
                        >
                            {t('common.action_cancel')}
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            loading={loading}
                            onClick={async () => {
                                try {
                                    const values =
                                        await formRef.current?.validateFieldsReturnFormatValue?.();
                                    setLoading(true);
                                    await userSdk.updateValidate({
                                        id: user.data?.id,
                                        name: values.name.trim(),
                                    });
                                    await validate.get();
                                    setMode(PersonalInformationMode.READONLY);
                                    message.success(t('common.status_success'));
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            icon={<SaveOutlined />}
                            type="link"
                        >
                            {t('common.action_save')}
                        </Button>
                    </div>
                )
            }
        >
            <GridForm
                loading={loadWatchers(['user'])}
                formRef={formRef as MutableRefObject<ProFormInstance>}
                formItems={formItems}
                fields={formData}
                col={2}
            />
        </Card>
    );
});

export default PersonalInformation;
