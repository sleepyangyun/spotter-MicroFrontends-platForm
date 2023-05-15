import { InputNumber } from 'antd';
import { FC, useEffect, useRef, useState } from 'react';
import { CAPTCHA_DIGIT } from '@spotter/utils';

interface CaptchaCodeProps {
    digit?: number;
    onFinish?: (captcha: string) => Promise<boolean>;
}

export const CaptchaCode: FC<CaptchaCodeProps> = ({ digit = CAPTCHA_DIGIT, onFinish }) => {
    const [index, setIndex] = useState(0);
    const [captcha, setCaptcha] = useState<(number | null)[]>(Array.from({ length: digit }));
    const inputRef = useRef<(HTMLInputElement | null)[]>([]);
    const [valid, setValid] = useState(true);
    useEffect(() => {
        // eslint-disable-next-line unicorn/no-array-reduce
        const i = captcha.reduce(
            (p, c, _i) => (p !== null || Number.isInteger(c) ? p : _i),
            null as number | null,
        );
        setIndex(i ?? digit - 1);

        if (!captcha.some((code) => !Number.isInteger(code))) {
            onFinish &&
                onFinish(captcha.join('')).then((result) => {
                    setValid(result);
                });
        } else {
            setValid(true);
        }
    }, [captcha]);

    useEffect(() => {
        inputRef.current[index]?.focus();
    }, [index]);

    return (
        <div>
            <div className="flex justify-between">
                {Array.from({ length: digit }, (_v, key) => ({ _v, key })).map((item, i) => (
                    <InputNumber
                        value={captcha[i] as any}
                        ref={(ref) => {
                            inputRef.current[i] = ref;
                        }}
                        onKeyDown={(event) => {
                            if (
                                !Number.isInteger(captcha[i]) &&
                                (event.key === 'Backspace' || event.key === 'Delete')
                            ) {
                                setIndex((key) => (key > 0 ? key - 1 : key));
                                inputRef.current[index]?.focus();
                            }
                        }}
                        controls={false}
                        maxLength={1}
                        key={item.key}
                        size="large"
                        onPressEnter={() => {
                            if (Number.isInteger(captcha[i])) {
                                setIndex(i + 1);
                            }
                        }}
                        onChange={(value) => {
                            setCaptcha((origin) => {
                                const newCaptcha = [...origin];
                                newCaptcha[i] = value;
                                return newCaptcha;
                            });
                        }}
                        inputMode="numeric"
                        style={{
                            width: 48,
                            height: 48,
                            padding: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...(!valid ? { borderColor: '#ff4d4f', background: '#ffece8' } : {}),
                        }}
                    />
                ))}
            </div>
            {!valid ? (
                <div role="alert" className="ant-form-item-explain-error">
                    Please verify your verification code.
                </div>
            ) : null}
        </div>
    );
};
