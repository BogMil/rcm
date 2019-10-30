import { ColModel } from "../../types/colModel/colModel";
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
  rows: any[];
  selectedRow: any;
  RCMID: number | null;
  tableWidth: number;
  colModels: ColModel[];
  contextMenuTrigger: any;
}

export interface TableBodyDispatchProps {
  selectRow: (row: any) => void
}

export type TableBodyProps = TableBodyOwnProps & TableBodyStateProps & TableBodyDispatchProps;

