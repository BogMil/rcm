import { ColModel, ColModelMethods } from "../../types/colModel/colModel";
import { IReduxAction } from "../../types/IReduxAction";

export const CrudModalActionTypeNames = {
  CLOSE_MODAL: "CLOSE_MODAL",
  OPEN_MODAL_TO_CREATE: "OPEN_MODAL_TO_CREATE",
  OPEN_MODAL_TO_EDIT: "OPEN_MODAL_TO_EDIT",
  GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA: "GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA",
  ON_ROW_DATA_CHANGE: 'ON_ROW_DATA_CHANGE',
}

export interface CloseModalRetType extends IReduxAction {
  type: typeof CrudModalActionTypeNames.CLOSE_MODAL;
  payload: null;
}

export interface OpenModalToCreateRetType extends IReduxAction {
  type: typeof CrudModalActionTypeNames.OPEN_MODAL_TO_CREATE;
  payload: null;
}

export interface OpenModalToEditRetType extends IReduxAction {
  type: typeof CrudModalActionTypeNames.OPEN_MODAL_TO_EDIT;
  payload: { rowData: any };
}

export interface GenerateColNamePropertiesInRowDataRetType extends IReduxAction {
  type: typeof CrudModalActionTypeNames.GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA;
  payload: {
    colModels: ColModel[]
  }
}

export interface OnRowDataChangeRetType extends IReduxAction {
  type: typeof CrudModalActionTypeNames.ON_ROW_DATA_CHANGE;
  payload: {
    name: string,
    value: any
  }
}

export type CrudModalActionType = CloseModalRetType | OpenModalToCreateRetType | GenerateColNamePropertiesInRowDataRetType | OnRowDataChangeRetType | OpenModalToEditRetType

export interface CrudModalState {

}

export const initialState = () => {
  return {

  } as CrudModalState
}

export interface CrudModalOwnProps {
  // colModelsProp:ColModel[]
  colModelsMethods: Array<ColModelMethods>
}

export const initialCrudModalStateProps = () => {
  return <CrudModalStateProps>{
    show: false,
    colModels: [],
    rowData: {},
    emptyRowData: {},
    isInCreateMode: false
  };
};

export interface IRowData {
  [key: string]: any | null;
}

export interface CrudModalStateProps {
  show: boolean;
  colModels: ColModel[];
  rowData: IRowData,
  emptyRowData: IRowData,
  isInCreateMode: boolean;
  RCMID: number;

}

export interface CrudModalDispatchProps {
  closeCrudModal: () => void,
  onRowDataChange: (name: string, value: any) => void
}

export type CrudModalProps = CrudModalOwnProps & CrudModalStateProps & CrudModalDispatchProps;

