import { ContextMenuModalStateProps, initialContextMenuModalStateProps, ContextMenuModalActionType, ContextMenuModalActionTypeNames ,SetContextMenuTriggerRefRetType} from './ContextMenuModal.types'
import update from 'immutability-helper'
import { ColModel } from '../../types/colModel';
import { CONTEXT_MENU_MODAL } from '../../actions/actionNamespaces';

export function ContextMenuModalReducer(
    state: ContextMenuModalStateProps = initialContextMenuModalStateProps(),
    action: ContextMenuModalActionType
): ContextMenuModalStateProps {
    if(action.namespace!= CONTEXT_MENU_MODAL)
        return state;

    switch (action.type) {

        case ContextMenuModalActionTypeNames.SET_CONTEXT_MENU_TRIGGER_REF: {
            let typedAction = <SetContextMenuTriggerRefRetType> action;

            return Object.assign({}, { ...state }, { contextMenuTrigger: typedAction.payload.ref });
        }

        default:
            return state
    }
}