import { ColModel } from "../../types/colModel/colModel";
import { IReduxAction } from "../../types/IReduxAction";

export const ContextMenuModalActionTypeNames = {
  SET_CONTEXT_MENU_TRIGGER_REF: "SET_CONTEXT_MENU_TRIGGER_REF",
}

export interface SetContextMenuTriggerRefRetType extends IReduxAction {
  type: typeof ContextMenuModalActionTypeNames.SET_CONTEXT_MENU_TRIGGER_REF
  payload: {
    ref: any
  },
}

export type ContextMenuModalActionType = SetContextMenuTriggerRefRetType

export interface ContextMenuModalState {

}

export const initialState = () => {
  return {

  } as ContextMenuModalState
}

export interface ContextMenuModalOwnProps {
}

export const initialContextMenuModalStateProps = () => {
  return {
    contextMenuTrigger: null,
    selectedRow: null,
    RCMID: Date.now()
  }
};

export interface ContextMenuModalStateProps {
  contextMenuTrigger: any;
  RCMID: number;
  selectedRow: any;
}

export interface ContextMenuModalDispatchProps {
  setContextMenuTriggerRef: (ref: any) => void,
  openCrudModalToEdit: (rowData: any) => void
  openWarningModal: (message: string) => void
  openYesnoModal: (question: string, title: string, onConfirm: Function, onDeny?: Function) => void
  openVModal: () => void
}

export type ContextMenuModalProps = ContextMenuModalOwnProps & ContextMenuModalStateProps & ContextMenuModalDispatchProps;

