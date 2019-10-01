import { IReduxAction } from "../../../types/IReduxAction";

export const WarningModalActionTypeNames = {
    CLOSE_MODAL: "CLOSE_MODAL",
    OPEN_MODAL: "OPEN_MODAL",
}

export interface CloseModalRetType extends IReduxAction {
    type: typeof WarningModalActionTypeNames.CLOSE_MODAL;
    payload: null;
}

export interface OpenModalRetType extends IReduxAction {
    type: typeof WarningModalActionTypeNames.OPEN_MODAL;
    payload: { message: string };
}



export type WarningModalActionType = CloseModalRetType | OpenModalRetType

export interface WarningModalState {

}

export const initialState = () => {
    return {

    } as WarningModalState
}

export interface WarningModalOwnProps {
}

export const initialWarningModalStateProps = () => {
    return <WarningModalStateProps>{
        show: false,
        message: ''
    };
};

export interface WarningModalStateProps {
    show: boolean;
    message: string

}

export interface WarningModalDispatchProps {
    closeModal: () => void,
}

export type WarningModalProps = WarningModalOwnProps & WarningModalStateProps & WarningModalDispatchProps;

