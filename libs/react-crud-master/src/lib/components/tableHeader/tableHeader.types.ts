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

export type TableHeaderActionType = SetColModelsRetType

export interface TableHeaderState {

}

export const initialState = () => {
  return {

  } as TableHeaderState
}

export interface TableHeaderOwnProps {
}

export const initialTableHeaderStateProps = () => {
  return {
  }
};

export interface TableHeaderStateProps {
  RCMID: number | null;
  tableWidth: number;
  colModels: ColModel[]
}

export interface TableHeaderDispatchProps {
  setColModels: (colModels: ColModel[]) => void,
  resizeColumn: (e: MouseEvent) => void,
  setColumnToResize: (column?: ColModel | null, e?: any | null) => void,
  resetTableoffsetWidth: () => void,
  changeOrderDirection: (column: ColModel) => void,
  openColMenuModel: (colModel: ColModel) => void,
  swapColumnPositions: (columnPosition1: number, columnPosition2: number) => void
}

export type TableHeaderProps = TableHeaderOwnProps & TableHeaderStateProps & TableHeaderDispatchProps;

