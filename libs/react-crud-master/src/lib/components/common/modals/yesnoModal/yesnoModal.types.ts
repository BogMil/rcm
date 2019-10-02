import { IReduxAction } from "../../../../types/IReduxAction";

export const YesnoModalActionTypeNames = {
    CLOSE_MODAL: "CLOSE_MODAL",
    OPEN_MODAL: "OPEN_MODAL",
}

export interface CloseModalRetType extends IReduxAction {
    type: typeof YesnoModalActionTypeNames.CLOSE_MODAL;
    payload: null;
}

export interface OpenModalRetType extends IReduxAction {
    type: typeof YesnoModalActionTypeNames.OPEN_MODAL;
    payload: {
        question: string,
        title: string
    };
}



export type YesnoModalActionType = CloseModalRetType | OpenModalRetType

export interface YesnoModalState {

}

export const initialState = () => {
    return {

    } as YesnoModalState
}

export interface YesnoModalOwnProps {
}

export const initialYesnoModalStateProps = () => {
    return <YesnoModalStateProps>{
        show: false,
        question: ''
    };
};

export interface YesnoModalStateProps {
    show: boolean;
    question: string;
    title: string;
}

export interface YesnoModalDispatchProps {
    closeModal: () => void,
}

export type YesnoModalProps = YesnoModalOwnProps & YesnoModalStateProps & YesnoModalDispatchProps;

