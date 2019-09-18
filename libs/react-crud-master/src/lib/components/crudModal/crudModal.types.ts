import { ColModel } from "../../types/colModel";
import { IReduxAction } from "../../types/IReduxAction";

export const CrudModalActionTypeNames = {
  CLOSE_MODAL: "CLOSE_MODAL",
  OPEN_MODAL:"OPEN_MODAL",
  GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA:"GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA",
  ON_ROW_DATA_CHANGE:'ON_ROW_DATA_CHANGE',
}

export interface CloseModalRetType extends IReduxAction {
  type: typeof CrudModalActionTypeNames.CLOSE_MODAL;
  payload: null;
}

export interface OpenModalRetType extends IReduxAction {
  type: typeof CrudModalActionTypeNames.OPEN_MODAL;
  payload: null;
}

export interface GenerateColNamePropertiesInRowDataRetType extends IReduxAction {
  type: typeof CrudModalActionTypeNames.GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA;
  payload: {
    colModels:ColModel[]
  }
}

export interface OnRowDataChangeRetType extends IReduxAction {
  type: typeof CrudModalActionTypeNames.ON_ROW_DATA_CHANGE;
  payload: {
    name:string,
    value:any
  }
}

export type CrudModalActionType = CloseModalRetType | OpenModalRetType | GenerateColNamePropertiesInRowDataRetType | OnRowDataChangeRetType

export interface CrudModalState {
  
}

export const initialState = () => {
  return {
  
  } as CrudModalState
}

export interface CrudModalOwnProps {
  // colModelsProp:ColModel[]
}

export const initialCrudModalStateProps = () => {
  return <CrudModalStateProps> {
    show:false,
    colModels:[],
    rowData:{},
    emptyRowData:{}
  };
};

export interface IRowData {
  [key:string]: any | null;
}

export interface CrudModalStateProps {
  show: boolean;
  colModels:ColModel[];
  rowData:IRowData,
  emptyRowData:IRowData,
}

export interface CrudModalDispatchProps {
  closeCrudModal: () => void ,
  onRowDataChange: (name:string,value:any)=>void
}

export type CrudModalProps = CrudModalOwnProps & CrudModalStateProps & CrudModalDispatchProps;

