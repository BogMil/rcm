import { ColModel } from "../../types/colModel";
import { IReduxAction } from "../../types/IReduxAction";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { setTableTitle } from "./reactCrudMaster.actions";

export const ReactCrudMasterActionTypeNames = {
  SET_COL_MODELS: "SET_COL_MODELS",
  RESIZE_COLUMN:"RESIZE_COLUMN",
  SET_COLUMN_TO_RESIZE:"SET_COLUMN_TO_RESIZE",
  SET_INITIAL_TABLE_OFFSET_WIDTH:'SET_INITIAL_TABLE_OFFSET_WIDTH',
  CHANGE_ORDER_DIRECTION : 'CHANGE_ORDER_DIRECTION',
  SELECT_ROW:'SELECT_ROW',
  SET_DATA:'SET_DATA',
  SET_TABLE_TITLE:'SET_TABLE_TITLE'
}

export interface SetColModelsRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.SET_COL_MODELS
  payload: {
    colModels: ColModel[],
    tableWidth: number
  },
}

export interface SetDataRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.SET_DATA
  payload: {
    data: any[],
  },
}


export interface ResizeColumnRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.RESIZE_COLUMN
  payload:{
    e: MouseEvent,
  }
}

export interface SetColumnToResizeRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.RESIZE_COLUMN
  payload:{
    e: any | null,
    column:ColModel | null,
  }
}

export interface ResetTableoffsetWidthRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.SET_INITIAL_TABLE_OFFSET_WIDTH
}

export interface ChangeOrderDirectionRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.CHANGE_ORDER_DIRECTION
  payload: {
    column:ColModel
  },
}

export interface SelectRowRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.SELECT_ROW
  payload: {
    row:any
  },
}

export interface SetTableTitleRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.SET_TABLE_TITLE
  payload: {
    tableTitle:string
  },
}

export type ReactCrudMasterActionType = SetColModelsRetType | ResizeColumnRetType | SetColumnToResizeRetType | ResetTableoffsetWidthRetType | ChangeOrderDirectionRetType | SelectRowRetType | 
SetDataRetType

export interface ReactCrudMasterState {
  colModels: ColModel[];
  data: any[];
  width: number;
  sortColumn: any;
  selectedRow: any;
  startOffset: number;
  columnToResize: ColModel | null;
  show: boolean;
  RCMID: number;
  modalState: any;
  emptyModalState: any;
  tableWidth: number;
}

export const initialState = () => {
  return {
    colModels: [],
    data: [],
    width: 0,
    sortColumn: null,
    selectedRow: null,
    startOffset: 0,
    columnToResize: null,
    show: false,
    RCMID: Date.now(),
    modalState: null,
    tableWidth: 0,
    emptyModalState: null,
  } as ReactCrudMasterState
}

export interface ReactCrudMasterOwnProps {
  colModelsProp: ColModel[];
  dataProp: any[];
  tableTitle?: string;
}

export const initialReactCrudMasterStateProps = () => {
  return {
    colModels: [],
    data: [],
    width: 0,
    sortColumn: null,
    selectedRow: null,
    startOffset: null,
    columnToResize: null,
    show: null,
    RCMID: Date.now(),
    modalState: null,
    emptyModalState: null,
    tableWidth: 0,
    tableTitleProp:'Table title'
  } as ReactCrudMasterStateProps
};

export interface ReactCrudMasterStateProps {
  colModels: ColModel[];
  data: any[];
  width: number ;
  sortColumn: any;
  selectedRow: any;
  startOffset: number | null;
  columnToResize: ColModel | null;
  show: boolean | null;
  RCMID: number | null;
  modalState: any;
  emptyModalState: any;
  tableWidth: number;
  tableTitleProp:string;
}

export interface ReactCrudMasterDispatchProps {
  setColModels: (colModels: ColModel[]) => ThunkAction<Promise<void>, {}, {}, AnyAction>,
  setData:(data:any[])=>void,
  resizeColumn: (e: MouseEvent) => void,
  setColumnToResize:(column?:ColModel | null,e?:any | null)=>void,
  resetTableoffsetWidth :()=>void,
  setTableTitle:(tableTitle:string)=>void
}

export type ReactCrudMasterProps = ReactCrudMasterOwnProps & ReactCrudMasterStateProps & ReactCrudMasterDispatchProps;

