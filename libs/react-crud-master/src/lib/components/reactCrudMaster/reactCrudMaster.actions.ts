import { ReactCrudMasterActionTypeNames, ReactCrudMasterActionType, Data } from './reactCrudMaster.types'
import { ColModel } from '../../types/colModel/colModel';
import { REACT_CRUD_MASTER } from '../../actions/actionNamespaces';
import cloneDeep from 'lodash/cloneDeep';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as CrudModalActions from '../crudModal/crudModal.actions'
import { AppState } from '../../rootReducer';
import { UrlCreatorFactory } from '../../types/url';
import axios from 'axios'
import { UserConfig } from '../../types/userConfig';
import { ColumnTypeNames } from '../../constants/columnTypeNames';
import { ForeignKey } from '../../types/columnTypes/foreignKeyColumnType';

const namespace = REACT_CRUD_MASTER;

export function privateSetColModels(colModels: ColModel[]): ReactCrudMasterActionType {
    let clonedColModels = <ColModel[]>cloneDeep(colModels);

    let tableWidth: number = 0;
    clonedColModels.forEach((colModel: ColModel) => {
        if (colModel.columnType.show) {
            tableWidth += getUsefullColModelWith(colModel);
            colModel.showColMenuModal = false;
        }
    });

    clonedColModels = orderColumns(clonedColModels);

    return {
        type: ReactCrudMasterActionTypeNames.SET_COL_MODELS,
        payload: {
            colModels: clonedColModels,
            tableWidth
        },
        namespace
    }
}

export function orderColumns(colModels: ColModel[]): ColModel[] {
    colModels = colModels.sort((a, b) => a.columnPosition > b.columnPosition ? 1 : -1)
    let colModelsWithColPosition = colModels.filter(x => {
        if (x.columnPosition != null)
            return true;
        return false
    })

    colModelsWithColPosition = colModelsWithColPosition.map((x, i) => {
        x.columnPosition = i
        return x;
    })

    let colModelsWithNullColPosition = colModels.filter(x => {
        if (x.columnPosition == null)
            return true;
        return false
    })

    colModels = [...colModelsWithColPosition, ...colModelsWithNullColPosition]
    colModels = colModels.map((x, i) => {
        x.columnPosition = i
        return x;
    })
    return colModels;
}

function getUsefullColModelWith(colModel: ColModel): number {
    if (colModel.width != null)
        return colModel.width;
    return 0;
}

export const setColModels = (colModels: ColModel[]): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        dispatch(privateSetColModels(colModels));
        dispatch(CrudModalActions.generateColNamePropertiesInRowData(colModels))
    }
}

export function setData(data: Data): ReactCrudMasterActionType {
    let clonedData = cloneDeep(data);
    return {
        type: ReactCrudMasterActionTypeNames.SET_DATA,
        payload: { data: clonedData },
        namespace,
    }
}

export function setLocalData(data: any[]): ReactCrudMasterActionType {
    let clonedData = cloneDeep(data);
    return {
        type: ReactCrudMasterActionTypeNames.SET_LOCAL_DATA,
        payload: { data: clonedData },
        namespace,
    }
}

export function resizeColumn(e: MouseEvent): ReactCrudMasterActionType {
    return {
        type: ReactCrudMasterActionTypeNames.RESIZE_COLUMN,
        payload: { e },
        namespace,
    }
}

export function setColumnToResize(column: (ColModel | null) = null, startOffset: number): ReactCrudMasterActionType {
    return {
        type: ReactCrudMasterActionTypeNames.SET_COLUMN_TO_RESIZE,
        payload: {
            startOffset,
            column
        },
        namespace,
    }
}

export function resetTableoffsetWidth(): ReactCrudMasterActionType {
    return {
        type: ReactCrudMasterActionTypeNames.SET_INITIAL_TABLE_OFFSET_WIDTH,
        namespace,
        payload: null
    }
}


export function changeOrderDirection(column: ColModel): ReactCrudMasterActionType {
    return {
        type: ReactCrudMasterActionTypeNames.CHANGE_ORDER_DIRECTION,
        namespace,
        payload: { column }
    }
}

export function selectRow(row: any): ReactCrudMasterActionType {
    return {
        type: ReactCrudMasterActionTypeNames.SELECT_ROW,
        namespace,
        payload: { row }
    }
}

export function setSimpleProps(config: UserConfig): ReactCrudMasterActionType {
    return {
        type: ReactCrudMasterActionTypeNames.SET_SIMPLE_PROPS,
        namespace,
        payload: { config }
    }
}

export function swapColumnPositions(columnPosition1: number, columnPosition2: number): ReactCrudMasterActionType {
    return {
        type: ReactCrudMasterActionTypeNames.SWAP_COLUMN_POSITIONS,
        namespace,
        payload: { columnPosition1, columnPosition2 }
    }
}

export function goToNextPage() {
    return (dispatch, getState) => {
        var urlCreator = UrlCreatorFactory.createFromStore(getState());
        fetchData(urlCreator.nextPage().url, dispatch)
    }
}

export function goToPreviousPage() {
    return (dispatch, getState) => {
        var urlCreator = UrlCreatorFactory.createFromStore(getState());
        fetchData(urlCreator.previousPage().url, dispatch)
    }
}

export function goToFirstPage() {
    return (dispatch, getState) => {
        var urlCreator = UrlCreatorFactory.createFromStore(getState());
        fetchData(urlCreator.nthPage(1).url, dispatch)
    }
}

export function goToLastPage() {
    return (dispatch, getState) => {
        let store = getState() as AppState;
        var urlCreator = UrlCreatorFactory.createFromStore(store);
        fetchData(urlCreator.nthPage(store.reactCrudMaster.data.totalNumberOfPages).url, dispatch)
    }
}

function fetchData(url, dispatch) {
    axios({
        method: 'get',
        url,
    }).then((res) => {
        let data = getDataFromRes(res);
        dispatch(setData(data));
    });
}

function getDataFromRes(res: any) {
    let data = new Data;
    data.rows = res.data.records;
    data.currentPageNumber = res.data.currentPageNumber;
    data.totalNumberOfPages = res.data.totalNumberOfPages;
    data.totalNumberOfRecords = res.data.totalNumberOfRecords;
    return data;
}