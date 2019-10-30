import { ColModel } from "../../types/colModel";
import { IReduxAction } from "../../types/IReduxAction";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import * as ReactCrudMasterConstants from './reactCrudMaster.constants'
import { UserConfig } from '../../types/userConfig';

export const ReactCrudMasterActionTypeNames = {
  SET_COL_MODELS: "SET_COL_MODELS",
  RESIZE_COLUMN: "RESIZE_COLUMN",
  SET_COLUMN_TO_RESIZE: "SET_COLUMN_TO_RESIZE",
  SET_INITIAL_TABLE_OFFSET_WIDTH: 'SET_INITIAL_TABLE_OFFSET_WIDTH',
  CHANGE_ORDER_DIRECTION: 'CHANGE_ORDER_DIRECTION',
  SELECT_ROW: 'SELECT_ROW',
  SET_DATA: 'SET_DATA',
  SET_LOCAL_DATA: 'SET_LOCAL_DATA',
  SWAP_COLUMN_POSITIONS: 'SWAP_COLUMN_POSITIONS',
  SET_SIMPLE_PROPS: 'SET_SIMPLE_PROPS'
}
export interface SetSimplePropsRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.SET_SIMPLE_PROPS
  payload: {
    config: UserConfig
  },
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
    data: Data,
  },
}

export interface SetLocalDataRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.SET_DATA
  payload: {
    data: any[],
  },
}



export interface ResizeColumnRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.RESIZE_COLUMN
  payload: {
    e: MouseEvent,
  }
}

export interface SetColumnToResizeRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.RESIZE_COLUMN
  payload: {
    // e: any | null,
    startOffset: number
    column: ColModel | null,
  }
}

export interface ResetTableoffsetWidthRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.SET_INITIAL_TABLE_OFFSET_WIDTH
}

export interface ChangeOrderDirectionRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.CHANGE_ORDER_DIRECTION
  payload: {
    column: ColModel
  },
}

export interface SelectRowRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.SELECT_ROW
  payload: {
    row: any
  },
}

export interface SwapColumnPositionsRetType extends IReduxAction {
  type: typeof ReactCrudMasterActionTypeNames.SWAP_COLUMN_POSITIONS
  payload: {
    columnPosition1: number, columnPosition2: number
  },
}

export type ReactCrudMasterActionType = SetColModelsRetType | ResizeColumnRetType | SetColumnToResizeRetType | ResetTableoffsetWidthRetType | ChangeOrderDirectionRetType | SelectRowRetType |
  SetDataRetType | SwapColumnPositionsRetType | SetSimplePropsRetType

export const initialReactCrudMasterStateProps = () => {
  return {
    colModels: [],
    // data: [],
    data: new Data(),
    componentWidth: 0,
    sortColumn: null,
    selectedRow: null,
    startOffset: null,
    columnToResize: null,
    show: null,
    RCMID: Date.now(),
    modalState: null,
    emptyModalState: null,
    tableWidth: 0,
    tableTitle: ReactCrudMasterConstants.DEFAULT_TABLE_TITLE
  } as ReactCrudMasterStateProps
};

export interface ReactCrudMasterStateProps {
  colModels: ColModel[];
  url: string;
  data: Data;
  componentWidth: number;
  sortColumn: any;
  selectedRow: any;
  startOffset: number | null;
  columnToResize: ColModel | null;
  show: boolean | null;
  RCMID: number | null;
  modalState: any;
  emptyModalState: any;
  tableWidth: number;
  tableTitle: string;
}

export interface ReactCrudMasterDispatchProps {
  setColModels: (colModels: ColModel[]) => ThunkAction<Promise<void>, {}, {}, AnyAction>,
  setData: (data: any[]) => void,
  resizeColumn: (e: MouseEvent) => void,
  setColumnToResize: (column?: ColModel | null, startOffset?: number | null) => void,
  resetTableoffsetWidth: () => void,
  setTableTitle: (tableTitle: string) => void
}
export class Data {
  rows: any[] = [];
  currentPageNumber: number = null;
  totalNumberOfPages: number = null;
  totalNumberOfRecords: number = null;
}
export type ReactCrudMasterProps = ReactCrudMasterStateProps & ReactCrudMasterDispatchProps;

