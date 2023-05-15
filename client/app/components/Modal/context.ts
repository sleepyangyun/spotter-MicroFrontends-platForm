import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { createContext } from 'react';

type ModalProps = Omit<ModalStaticFunctions, 'warn'>;

export interface SpotterModalProps {
    modal: ModalProps;
}

export default createContext<SpotterModalProps>({
    modal: {} as ModalProps,
});
