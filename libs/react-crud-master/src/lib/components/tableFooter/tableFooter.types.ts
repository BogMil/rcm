import { ColModel } from "../../types/colModel";
import { IReduxAction } from "../../types/IReduxAction";

export const TableFooterActionTypeNames = {
  GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA:"GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA"
}

export interface GenerateColNamePropertiesInRowDataRetType extends IReduxAction {
  type: typeof TableFooterActionTypeNames.GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA
  payload: {
    colModels:ColModel[]
  }
}

export type TableFooterActionType = GenerateColNamePropertiesInRowDataRetType

export interface TableFooterState {
  
}

export const initialState = () => {
  return {
  
  } as TableFooterState
}

export interface TableFooterOwnProps {
    tableWidth:number
}

export const initialTableFooterStateProps = () => {
  return {
  };
};

export interface TableFooterStateProps {
}

export interface TableFooterDispatchProps {
  openCrudModal: () => void,
}

export type TableFooterProps = TableFooterOwnProps & TableFooterStateProps & TableFooterDispatchProps;

