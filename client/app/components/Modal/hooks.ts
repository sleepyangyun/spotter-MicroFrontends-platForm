import ModalContext from '@app/components/Modal/context';
import { useContext } from 'react';

export const useSpotterModal = () => {
    const modalContext = useContext(ModalContext);

    return modalContext.modal;
};
