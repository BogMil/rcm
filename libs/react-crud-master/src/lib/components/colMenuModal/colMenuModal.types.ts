import { ColModel } from "../../types/ColModel";
import { IReduxAction } from "../../types/IReduxAction";

export const ColMenuModalActionTypeNames = {
  OPEN_MODAL: "OPEN_MODAL",
  CLOSE_MODAL:'CLOSE_MODAL'
}

export interface OpenModalRetType extends IReduxAction {
  type: typeof ColMenuModalActionTypeNames.OPEN_MODAL;
  payload: {
    colModel:ColModel | null
  };
}

export interface CloseModalRetType extends IReduxAction {
  type: typeof ColMenuModalActionTypeNames.CLOSE_MODAL;
  payload:null;
}

export type ColMenuModalActionType = OpenModalRetType | CloseModalRetType

export interface ColMenuModalState {
  
}

export const initialState = () => {
  return {
  
  } as ColMenuModalState
}

export interface ColMenuModalOwnProps {
}

export const initialColMenuModalStateProps = () => {
  return {
    colModel:new ColModel(),
    show:false,
  }
};

export interface ColMenuModalStateProps {
  colModel: ColModel;
  show:boolean;

}

export interface ColMenuModalDispatchProps {
  closeColMenuModel:()=>void
}

export type ColMenuModalProps = ColMenuModalOwnProps & ColMenuModalStateProps & ColMenuModalDispatchProps;

