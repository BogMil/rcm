import { WarningModalStateProps, initialWarningModalStateProps, WarningModalActionType, WarningModalActionTypeNames, OpenModalRetType } from './warningModal.types'
import update from 'immutability-helper'
import { WARNING_MODAL as NAMESPACE } from '../../../../actions/actionNamespaces';

export function WarningModalReducer(
    state: WarningModalStateProps = initialWarningModalStateProps(),
    action: WarningModalActionType
): WarningModalStateProps {
    if (action.namespace != NAMESPACE)
        return state;

    switch (action.type) {

        case WarningModalActionTypeNames.CLOSE_MODAL: {
            return initialWarningModalStateProps();
        }

        case WarningModalActionTypeNames.OPEN_MODAL: {
            let typedAction = <OpenModalRetType>action
            return Object.assign({}, { ...state }, { show: true, message: typedAction.payload.message });
        }

        default:
            return state
    }
}