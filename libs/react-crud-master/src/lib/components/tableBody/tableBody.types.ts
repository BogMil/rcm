import { ColModel } from "../../types/colModel";
import { IReduxAction } from "../../types/IReduxAction";

export const ReactableActionTypeNames = {
  SET_COL_MODELS: "SET_COL_MODELS",
}

export interface SetColModelsRetType extends IReduxAction {
  type: typeof ReactableActionTypeNames.SET_COL_MODELS
  payload: {
    colModels: ColModel[],
    tableWidth: number
  },
}

export type TableBodyActionType = SetColModelsRetType 

export interface TableBodyState {
  
}

export const initialState = () => {
  return {
  
  } as TableBodyState
}

export interface TableBodyOwnProps {
}

export const initialTableBodyStateProps = () => {
  return {
  }
};

export interface TableBodyStateProps {
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
  colModels: ColModel[];
  contextTrigger:any;

}

export interface TableBodyDispatchProps {
    selectRow:(row:any)=>void
}

export type TableBodyProps = TableBodyOwnProps & TableBodyStateProps & TableBodyDispatchProps;

