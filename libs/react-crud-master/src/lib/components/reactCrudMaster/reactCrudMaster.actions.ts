import { ReactCrudMasterActionTypeNames, ReactCrudMasterActionType } from './reactCrudMaster.types'
import { ColModel } from '../../types/colModel';
import { REACT_CRUD_MASTER } from '../../actions/actionNamespaces';
import cloneDeep from 'lodash/cloneDeep';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as CrudModalActions from '../crudModal/crudModal.actions'

const namespace = REACT_CRUD_MASTER;

export function privateSetColModels(colModels: ColModel[]): ReactCrudMasterActionType {
    let clonedColModels = cloneDeep(colModels);

    let tableWidth: number = 0;
    clonedColModels.forEach((colModel: ColModel) => {
        tableWidth += getUsefullColModelWith(colModel);
        colModel.showColMenuModal = false;
    });

    return  {
        type: ReactCrudMasterActionTypeNames.SET_COL_MODELS,
        payload: {
            colModels: clonedColModels,
            tableWidth
        },
        namespace
    }
}

function getUsefullColModelWith(colModel:ColModel):number{
    if(colModel.width!=null)
        return colModel.width;
    return 0;
}

export const setColModels = (colModels:ColModel[]): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        dispatch(privateSetColModels(colModels));
        dispatch(CrudModalActions.generateColNamePropertiesInRowData(colModels))
    }
}

export function setData(data: any[]): ReactCrudMasterActionType {
    let clonedData = cloneDeep(data);
    return {
        type:ReactCrudMasterActionTypeNames.SET_DATA,
        payload:{data:clonedData},
        namespace,
    }
}

export function resizeColumn(e: MouseEvent): ReactCrudMasterActionType {
    return {
        type:ReactCrudMasterActionTypeNames.RESIZE_COLUMN,
        payload:{e,},
        namespace,
    }
}

export function setColumnToResize(column:(ColModel | null) = null,e: any =null): ReactCrudMasterActionType {
    return {
        type:ReactCrudMasterActionTypeNames.SET_COLUMN_TO_RESIZE,
        payload:{
            e,
            column
        },
        namespace,
    }
}

export function resetTableoffsetWidth(): ReactCrudMasterActionType {
    return {
        type:ReactCrudMasterActionTypeNames.SET_INITIAL_TABLE_OFFSET_WIDTH,
        namespace,
        payload:null
    }
}


export function changeOrderDirection(column : ColModel): ReactCrudMasterActionType {
    return {
        type:ReactCrudMasterActionTypeNames.CHANGE_ORDER_DIRECTION,
        namespace,
        payload:{column}
    }
}

export function selectRow(row :any): ReactCrudMasterActionType {
    return {
        type:ReactCrudMasterActionTypeNames.SELECT_ROW,
        namespace,
        payload:{row}
    }
}

export function setTableTitle(tableTitle :any): ReactCrudMasterActionType {
    return {
        type:ReactCrudMasterActionTypeNames.SET_TABLE_TITLE,
        namespace,
        payload:{tableTitle}
    }
}
