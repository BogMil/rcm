import { ColModel } from '../../types/colModel/colModel';
import { CRUD_MODAL } from '../../actions/actionNamespaces';
import cloneDeep from 'lodash/cloneDeep';
import { CrudModalActionType, CrudModalActionTypeNames, GenerateColNamePropertiesInRowDataRetType } from './crudModal.types';

const namespace = CRUD_MODAL;

export function closeModal(): CrudModalActionType {
    return {
        type: CrudModalActionTypeNames.CLOSE_MODAL,
        payload: null,
        namespace
    }
}

export function openModalToCreate(): CrudModalActionType {
    return {
        type: CrudModalActionTypeNames.OPEN_MODAL_TO_CREATE,
        payload: null,
        namespace
    }
}

export function openModalToEdit(rowData): CrudModalActionType {
    return {
        type: CrudModalActionTypeNames.OPEN_MODAL_TO_EDIT,
        payload: { rowData },
        namespace
    }
}

export function generateColNamePropertiesInRowData(colModels: ColModel[]): GenerateColNamePropertiesInRowDataRetType {

    return {
        type: CrudModalActionTypeNames.GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA,
        payload: {
            colModels
        },
        namespace
    }
}

export function onRowDataChange(name: string, value: any): CrudModalActionType {
    return {
        type: CrudModalActionTypeNames.ON_ROW_DATA_CHANGE,
        payload: {
            name,
            value
        },
        namespace
    }
}