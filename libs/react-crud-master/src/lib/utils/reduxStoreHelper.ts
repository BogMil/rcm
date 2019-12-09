import { AppState } from '../rootReducer';
import { ColumnTypeNames } from '../constants/columnTypeNames';

export function getDataInfo(getStore: () => {}) {
    var store = getStore() as AppState;
    return store.reactCrudMaster.data;
}

export function getPkName(getStore: () => {}) {
    let store = getStore() as AppState;
    return store.reactCrudMaster.colModels.find(s => s.columnType.name == ColumnTypeNames.PRIMARY_KEY).name
}