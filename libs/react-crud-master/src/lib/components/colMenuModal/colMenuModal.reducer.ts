import { ColMenuModalStateProps, initialColMenuModalStateProps, ColMenuModalActionType, ColMenuModalActionTypeNames, OpenModalRetType } from './colMenuModal.types'
import update from 'immutability-helper'
import { ColModel } from '../../types/colModel';
import { COL_MENU_MODAL } from '../../actions/actionNamespaces';

export function ColMenuModalReducer(
    state: ColMenuModalStateProps = initialColMenuModalStateProps(),
    action: ColMenuModalActionType
): ColMenuModalStateProps {
    if(action.namespace!= COL_MENU_MODAL)
        return state;

    switch (action.type) {

        case ColMenuModalActionTypeNames.OPEN_MODAL: {
            let typedAction = <OpenModalRetType> action;

            return Object.assign({}, { ...state }, { show: true,colModel:typedAction.payload.colModel });
        }

        case ColMenuModalActionTypeNames.CLOSE_MODAL: {
            return Object.assign({}, { ...state }, { show: false, colModel:null });
        }

        default:
            return state
    }
}