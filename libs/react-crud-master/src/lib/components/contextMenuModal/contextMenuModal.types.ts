import { ColModel } from "../../types/colModel";
import { IReduxAction } from "../../types/IReduxAction";

export const ContextMenuModalActionTypeNames = {
  SET_CONTEXT_MENU_TRIGGER_REF: "SET_CONTEXT_MENU_TRIGGER_REF",
}

export interface SetContextMenuTriggerRefRetType extends IReduxAction {
  type: typeof ContextMenuModalActionTypeNames.SET_CONTEXT_MENU_TRIGGER_REF
  payload: {
    ref:any
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
      contextMenuTrigger:null,
      RCMID:Date.now()
  }
};

export interface ContextMenuModalStateProps {
  contextMenuTrigger : any;
  RCMID:number
}

export interface ContextMenuModalDispatchProps {
    setContextMenuTriggerRef:(ref:any)=>void
}

export type ContextMenuModalProps = ContextMenuModalOwnProps & ContextMenuModalStateProps & ContextMenuModalDispatchProps;

