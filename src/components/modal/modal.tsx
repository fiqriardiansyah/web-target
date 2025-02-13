import { Modal, ModalProps } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type HandlerProps = {
    data: unknown;
    isModalOpen: boolean;
    openModal: () => void;
    openModalWithData: (data: unknown) => void;
    closeModal: () => void;
};

export type ModalCustomProps = Omit<ModalProps, "children"> & {
    children: (data: HandlerProps) => void;
    handler?: (data: HandlerProps) => void;
    handlerInComponent?: (data: HandlerProps) => void;
    handlerDataChange?: (data: unknown) => void;
    stateWithUrlParams?: "add" | "edit";
    isModalOpenFn?: (state: boolean) => void;
};

const ModalCustom = ({ stateWithUrlParams, isModalOpenFn, children, handler, handlerInComponent, handlerDataChange, ...props }: ModalCustomProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState<unknown>(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const stateUrl = searchParams.get(stateWithUrlParams || "");

    useEffect(() => {
        if (isModalOpenFn) {
            isModalOpenFn(isModalOpen);
        }
    }, [isModalOpen]);

    useEffect(() => {
        if (!stateWithUrlParams) return;
        if (!stateUrl) {
            return;
        }
        setIsModalOpen(true);
    }, [stateUrl]);

    useEffect(() => {
        if (handlerDataChange) {
            handlerDataChange(data);
        }
    }, [data]);

    const closeModal = () => {
        if (stateWithUrlParams) {
            searchParams.delete(stateWithUrlParams);
            setSearchParams(searchParams);
        }

        setIsModalOpen(false);
        setData(null);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const openModalWithData = (dt: unknown) => {
        setData(dt);
        openModal();
    };

    const childrenData: HandlerProps = {
        data,
        isModalOpen,
        openModal,
        closeModal,
        openModalWithData,
    };

    if (handler) {
        handler(childrenData);
    }

    return (
        <>
            <Modal open={isModalOpen} onCancel={closeModal} {...props}>
                <>{children(childrenData)}</>
            </Modal>
            {handlerInComponent && handlerInComponent(childrenData)}
        </>
    );
};

export default ModalCustom;
