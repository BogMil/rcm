import { ColModel } from "../../types/colModel/colModel";
import { IReduxAction } from "../../types/IReduxAction";

export const VModalActionTypeNames = {
  CLOSE_MODAL: "CLOSE_MODAL",
  OPEN_MODAL: "OPEN_MODAL_TO_CREATE"
}

export interface CloseModalRetType extends IReduxAction {
  type: typeof VModalActionTypeNames.CLOSE_MODAL;
  payload: null;
}

export interface OpenModalToCreateRetType extends IReduxAction {
  type: typeof VModalActionTypeNames.OPEN_MODAL;
  payload: null;
}


export type VModalActionType = CloseModalRetType | OpenModalToCreateRetType

export interface VModalState {

}

export const initialState = () => {
  return {

  } as VModalState
}

export interface VModalOwnProps {
  // colModelsProp:ColModel[]
}

export const initialVModalStateProps = () => {
  return <VModalStateProps>{
    show: false,
    colModels: [],
    rowData: {},
  };
};

export interface IRowData {
  [key: string]: any | null;
}

export interface VModalStateProps {
  show: boolean;
  colModels: ColModel[];
  rowData: IRowData
}

export interface VModalDispatchProps {
  closeVModal: () => void,
}

export type VModalProps = VModalOwnProps & VModalStateProps & VModalDispatchProps;

