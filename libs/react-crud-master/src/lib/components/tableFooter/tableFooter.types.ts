export interface TableFooterState {

}

export const initialState = () => {
  return {

  } as TableFooterState
}

export interface TableFooterOwnProps {
  tableWidth: number
}

export const initialTableFooterStateProps = () => {
  return {
  };
};

export interface TableFooterStateProps {
  selectedRow: any
}

export interface TableFooterDispatchProps {
  openCrudModalToCreate: () => void,
  openCrudModalToEdit: (rowData: any) => void
  openWarningModal: (message: string) => void
}

export type TableFooterProps = TableFooterOwnProps & TableFooterStateProps & TableFooterDispatchProps;

