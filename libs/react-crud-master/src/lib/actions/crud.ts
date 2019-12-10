import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as CrudService from '../services/crudService'
import { Data } from '../components/reactCrudMaster/reactCrudMaster.types';
import * as ReactCrudMasterActions from '../components/reactCrudMaster/reactCrudMaster.actions'
import { IReduxAction } from '../types/IReduxAction';
import { UrlCreator } from '../types/url';
import { AppState } from '../rootReducer';
import * as StoreHelper from '../utils/reduxStoreHelper'
import { colModels } from '../testData';
import { ColumnTypeNames } from '../constants/columnTypeNames';

export const get = (url: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getStore): Promise<void> => {
        await CrudService.get(url)
            .then((res) => {
                let data = new Data;
                // data.rows = res.data.records;
                data.currentPageNumber = res.data.currentPageNumber;
                data.totalNumberOfPages = res.data.totalNumberOfPages;
                data.totalNumberOfRecords = res.data.totalNumberOfRecords;

                let store = getStore() as AppState;
                let colModels = store.reactCrudMaster.colModels;

                data.rows = res.data.records.map((row) => {
                    colModels.forEach(colModel => {
                        if (colModel.columnType.name == ColumnTypeNames.DATE_TIME)
                            row[colModel.name] = new Date(row[colModel.name]);
                    });
                    return row;
                });

                dispatch(ReactCrudMasterActions.setData(data));
            });
    }
}

export const create = (url: string, data: any): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getStore): Promise<void> => {
        await CrudService.create(url, data)

        var dataInfo = StoreHelper.getDataInfo(getStore)
        var refreshUrl = new UrlCreator({ baseUrl: url, currentPageNumber: dataInfo.currentPageNumber, numOfRowsPerPage: dataInfo.numOfRowsPerPage }).url;
        dispatch(get(refreshUrl));
    }
}

export const update = (url: string, data: any): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getStore): Promise<void> => {
        await CrudService.update(url, data)

        var dataInfo = StoreHelper.getDataInfo(getStore)
        var refreshUrl = new UrlCreator({ baseUrl: url, currentPageNumber: dataInfo.currentPageNumber, numOfRowsPerPage: dataInfo.numOfRowsPerPage }).url;
        dispatch(get(refreshUrl));
    }
}

export const del = (url: string, row: any): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getStore): Promise<void> => {
        let pkName = StoreHelper.getPkName(getStore);
        await CrudService.del(url, row[pkName])

        var dataInfo = StoreHelper.getDataInfo(getStore)
        var refreshUrl = new UrlCreator({ baseUrl: url, currentPageNumber: dataInfo.currentPageNumber, numOfRowsPerPage: dataInfo.numOfRowsPerPage }).url;
        dispatch(get(refreshUrl));
    }
}