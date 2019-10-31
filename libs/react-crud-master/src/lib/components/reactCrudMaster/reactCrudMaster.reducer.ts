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
    SwapColumnPositionsRetType,
    SetLocalDataRetType,
    SetSimplePropsRetType
} from './reactCrudMaster.types'
import update from 'immutability-helper'
import { REACT_CRUD_MASTER } from '../../actions/actionNamespaces';
import { ColumnTypeNames } from '../../constants/columnTypeNames';
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
                    data: Object.assign({}, { ...state.data }, {
                        currentPageNumber: typedAction.payload.data.currentPageNumber,
                        rows: typedAction.payload.data.rows,
                        totalNumberOfPages: typedAction.payload.data.totalNumberOfPages,
                        totalNumberOfRecords: typedAction.payload.data.totalNumberOfRecords
                    })
                });
        }

        case ReactCrudMasterActionTypeNames.SET_LOCAL_DATA: {
            let typedAction = <SetLocalDataRetType>action

            return Object.assign({}, { ...state },
                {
                    data: Object.assign({}, state.data, { rows: typedAction.payload.data })
                });
        }

        case ReactCrudMasterActionTypeNames.RESIZE_COLUMN:
            action = <ResizeColumnRetType>action;

            let pageX = action.payload.e.pageX
            let colModels = state.colModels.map(colModel => {
                if (colModel.name == state.columnToResize!.name) {
                    if (state.startOffset! + pageX >= state.columnToResize!.minWidth) {
                        colModel.width = state.startOffset! + pageX + 10;
                    }
                }
                return colModel;
            });

            let tableWidth = 0;
            colModels.forEach(colModel => {
                if (colModel.columnType.show)
                    tableWidth += colModel.width;
            });
            let newState = update(state, { colModels: { $set: colModels }, tableWidth: { $set: tableWidth } });
            return newState;

        case ReactCrudMasterActionTypeNames.SET_COLUMN_TO_RESIZE: {
            let typedAction = <SetColumnToResizeRetType>action;
            let { column, startOffset } = { ...typedAction.payload }

            if (column != null)
                return Object.assign({}, { ...state }, { columnToResize: column, startOffset: startOffset })
            return Object.assign({}, { ...state }, { columnToResize: null })
        }

        case ReactCrudMasterActionTypeNames.SET_INITIAL_TABLE_OFFSET_WIDTH: {
            let tableBody = document.getElementById(`CMID-${state.RCMID}`)!;
            return Object.assign({}, { ...state }, { componentWidth: tableBody.offsetWidth })
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
        case ReactCrudMasterActionTypeNames.SET_SIMPLE_PROPS: {
            let typedAction = <SetSimplePropsRetType>action;

            let newData = Object.assign({}, { ...state.data }, {
                numOfRowsPerPage: typedAction.payload.config.numOfRowsPerPage,
                listOfNumOfRowsPerPage: typedAction.payload.config.listOfNumOfRowsPerPage
            })
            let newStore = Object.assign({}, { ...state }, {
                url: typedAction.payload.config.url,
                tableTitle: typedAction.payload.config.tableTitle,
                data: newData
            })
            return newStore;
        }

        case ReactCrudMasterActionTypeNames.SWAP_COLUMN_POSITIONS: {
            let typedAction = <SwapColumnPositionsRetType>action;
            colModels = state.colModels;

            let temp = colModels.find(x => x.columnPosition == typedAction.payload.columnPosition1)
            colModels[typedAction.payload.columnPosition1] = colModels[typedAction.payload.columnPosition2]
            colModels[typedAction.payload.columnPosition2] = temp

            colModels = colModels.map((x, i) => {
                x.columnPosition = i
                return x
            })
            let stater = Object.assign({}, { ...state }, { colModels: colModels })
            console.log(stater)
            return stater
        }
        default:
            return state
    }
}