import { ColMenuModalActionTypeNames, ColMenuModalActionType } from './colMenuModal.types'
import { ColModel } from '../../types/colModel';
import { COL_MENU_MODAL } from '../../actions/actionNamespaces';
import cloneDeep from 'lodash/cloneDeep';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as CrudModalActions from '../crudModal/crudModal.actions'

const namespace = COL_MENU_MODAL;

export function openModal(colModel:ColModel): ColMenuModalActionType {
    return {
        type: ColMenuModalActionTypeNames.OPEN_MODAL,
        payload:{
            colModel
        },
        namespace
    }
}

export function closeModal(): ColMenuModalActionType {
    return {
        type: ColMenuModalActionTypeNames.CLOSE_MODAL,
        payload:null,
        namespace
    }
}

