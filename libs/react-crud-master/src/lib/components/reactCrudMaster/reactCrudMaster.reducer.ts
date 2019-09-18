import {
    ReactCrudMasterActionType,
    ReactCrudMasterActionTypeNames,
    ReactCrudMasterStateProps,
    initialReactCrudMasterStateProps,
    SetColModelsRetType,
    ResizeColumnRetType,
    SetColumnToResizeRetType,
    ChangeOrderDirectionRetType,
    SelectRowRetType,
    SetDataRetType,
    SetTableTitleRetType,
} from './reactCrudMaster.types'
import update from 'immutability-helper'
import { REACT_CRUD_MASTER } from '../../actions/actionNamespaces';
export const initialState = {
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
    emptyModalState: null
}

export function reactCrudMasterReducer(
    state: ReactCrudMasterStateProps = initialReactCrudMasterStateProps(),
    action: ReactCrudMasterActionType
): ReactCrudMasterStateProps {
    if (action.namespace != REACT_CRUD_MASTER)
        return state;

    switch (action.type) {
        case ReactCrudMasterActionTypeNames.SET_COL_MODELS: {
            action = <SetColModelsRetType>action

            return Object.assign({}, { ...state },
                {
                    colModels: action.payload.colModels,
                    tableWidth: action.payload.tableWidth,
                });
        }

        case ReactCrudMasterActionTypeNames.SET_DATA: {
            let typedAction = <SetDataRetType>action

            return Object.assign({}, { ...state },
                {
                    data:typedAction.payload.data
                });
        }

        case ReactCrudMasterActionTypeNames.RESIZE_COLUMN:
            action = <ResizeColumnRetType>action;

            let pageX = action.payload.e.pageX
            let colModels = state.colModels.map(colModel => {
                if (colModel.name == state.columnToResize!.name) {
                    if (state.startOffset! + pageX >= state.columnToResize!.minWidth) {
                        colModel.width = state.startOffset! + pageX;
                    }
                }
                return colModel;
            });

            let tableWidth = 0;
            colModels.forEach(colModel => {
                tableWidth += colModel.width;
            });
            let newState = update(state, { colModels: { $set: colModels }, tableWidth: { $set: tableWidth } });

            return newState;

        case ReactCrudMasterActionTypeNames.SET_COLUMN_TO_RESIZE: {
            let typedAction = <SetColumnToResizeRetType>action;
            let { column, e } = { ...typedAction.payload }

            if (column != null)
                return Object.assign({}, { ...state }, { columnToResize: column, startOffset: e.target.parentNode.offsetWidth - e.pageX })
            return Object.assign({}, { ...state }, { columnToResize: null })
        }

        case ReactCrudMasterActionTypeNames.SET_INITIAL_TABLE_OFFSET_WIDTH: {
            let tableBody = document.getElementById(`CMID-${state.RCMID}`)!;
            return Object.assign({}, { ...state }, { width: tableBody.offsetWidth })
        }

        case ReactCrudMasterActionTypeNames.SELECT_ROW: {
            let typedAction = <SelectRowRetType>action;
            return Object.assign({}, { ...state }, { selectedRow: typedAction.payload.row })
        }

        case ReactCrudMasterActionTypeNames.CHANGE_ORDER_DIRECTION: {
            let typedAction = <ChangeOrderDirectionRetType>action;
            let colModels = state.colModels.map((column) => {

                if (column.name == typedAction.payload.column.name) {

                    if (column.orderDirection === "asc")
                        column.orderDirection = "desc";
                    else if (column.orderDirection === "desc")
                        column.orderDirection = "";
                    else column.orderDirection = "asc";
                } else {
                    column.orderDirection = ""
                }

                return column;
            });

            return Object.assign({}, { ...state }, { colModels: colModels })
        }

        case ReactCrudMasterActionTypeNames.SET_TABLE_TITLE: {
            let typedAction = <SetTableTitleRetType>action;
            return Object.assign({}, { ...state }, { tableTitleProp: typedAction.payload.tableTitle })
        }
        default:
            return state
    }
}