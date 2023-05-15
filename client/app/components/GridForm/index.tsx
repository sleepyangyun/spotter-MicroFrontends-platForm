import {
    ProForm,
    ProFormText,
    ProFormDigit,
    ProFormSelect,
    ProFormDatePicker,
    ProFormTimePicker,
    ProFormDateTimePicker,
    ProFormUploadDragger,
    ProFormUploadButton,
    ProFormItemProps,
    ProFormFieldProps,
    ProFormInstance,
    ProFormSelectProps,
} from '@ant-design/pro-components';
import {
    Col,
    ColProps,
    InputNumberProps,
    InputProps,
    Row,
    Spin,
    DatePickerProps,
    RowProps,
} from 'antd';
import { FC, MutableRefObject, ReactNode, createElement } from 'react';
import { FieldData } from 'rc-field-form/es/interface';
import classNames from 'classnames';
import { FormLayout } from 'antd/es/form/Form';
import { formatUsAmount } from '@spotter/utils';

type ProFormAnyItemProps =
    | ProFormSelectProps
    | ProFormFieldProps<InputProps>
    | ProFormFieldProps<InputNumberProps>
    | ProFormItemProps<DatePickerProps>
    | ProFormFieldProps<DatePickerProps>;

export type GridFormItem = {
    label: ReactNode;
    name: string;
    render?: (val: any) => ReactNode;
    type?:
        | 'string'
        | 'number'
        | 'enum'
        | 'enum-search'
        | 'date'
        | 'time'
        | 'date-time'
        | 'file-dragger'
        | 'file';
} & ProFormAnyItemProps;
export interface GridFormProps {
    loading?: boolean;
    fields?: FieldData[];
    formRef?: MutableRefObject<ProFormInstance>;
    col: number;
    formItems: GridFormItem[];
    layout?: FormLayout;
    labelCol?: ColProps;
    rowJustify?: RowProps['justify'];
}

const getFormItemComponent = (type: GridFormItem['type']) => {
    switch (type) {
        case 'number': {
            return ProFormDigit;
        }
        case 'enum': {
            return ProFormSelect;
        }
        case 'enum-search': {
            return ProFormSelect.SearchSelect;
        }
        case 'date': {
            return ProFormDatePicker;
        }
        case 'time': {
            return ProFormTimePicker;
        }
        case 'date-time': {
            return ProFormDateTimePicker;
        }
        case 'file-dragger': {
            return ProFormUploadDragger;
        }
        case 'file': {
            return ProFormUploadButton;
        }
        default: {
            return ProFormText;
        }
    }
};

export const GridForm: FC<GridFormProps> = ({
    fields,
    formRef,
    col,
    formItems,
    layout = 'vertical',
    labelCol,
    loading = false,
    rowJustify = 'start',
}) => {
    for (const b of formItems) {
        if (b.type === 'number' && b.readonly && !b?.render) {
            b.render = (val: string) => <>{formatUsAmount(val)}</>;
        }
    }
    return (
        <Spin spinning={loading}>
            <ProForm
                className="spotter-grid-form"
                fields={fields}
                submitter={{
                    render: false,
                }}
                layout={layout}
                formRef={formRef}
                labelCol={labelCol}
            >
                {formItems
                    .reduce((p, c, i) => {
                        if (i % col === 0) {
                            p.push([c]);
                        } else {
                            p[p.length - 1].push(c);
                        }
                        return p;
                    }, [] as GridFormItem[][])
                    .map((cols, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Row key={index} gutter={[36, 0]} justify={rowJustify}>
                            {cols.map((item) => (
                                <Col
                                    {...item.colProps}
                                    key={item.name}
                                    span={item.colProps?.span ?? 24 / col}
                                >
                                    {createElement(
                                        getFormItemComponent(item.type) as any,
                                        {
                                            ...item,
                                            filedConfig: {
                                                ...item.filedConfig,
                                                className: classNames(
                                                    item.filedConfig?.className ?? '',
                                                    {
                                                        'spotter-form-item-readonly': item.readonly,
                                                    },
                                                ),
                                            },
                                            key: item.name,
                                            name: item.name,
                                            label: (
                                                <span className="text-gray-500">{item.label}</span>
                                            ),
                                        } as any,
                                    )}
                                </Col>
                            ))}
                        </Row>
                    ))}
            </ProForm>
        </Spin>
    );
};
