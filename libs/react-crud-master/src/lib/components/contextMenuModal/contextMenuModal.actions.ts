import { ContextMenuModalActionTypeNames, ContextMenuModalActionType } from './ContextMenuModal.types'
import { ColModel } from '../../types/colModel';
import { CONTEXT_MENU_MODAL } from '../../actions/actionNamespaces';
import cloneDeep from 'lodash/cloneDeep';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as CrudModalActions from '../crudModal/crudModal.actions'

const namespace = CONTEXT_MENU_MODAL;

export function setContextMenuTriggerRef(c:any): ContextMenuModalActionType {
    return {
        type: ContextMenuModalActionTypeNames.SET_CONTEXT_MENU_TRIGGER_REF,
        payload:{
            ref:c
        },
        namespace
    }
}


