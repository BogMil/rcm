import { YesnoModalStateProps, initialYesnoModalStateProps, YesnoModalActionType, YesnoModalActionTypeNames, OpenModalRetType } from './yesnoModal.types'
import update from 'immutability-helper'
import { YESNO_MODAL as NAMESPACE } from '../../../../actions/actionNamespaces';

export function YesnoModalReducer(
    state: YesnoModalStateProps = initialYesnoModalStateProps(),
    action: YesnoModalActionType
): YesnoModalStateProps {
    if (action.namespace != NAMESPACE)
        return state;

    switch (action.type) {

        case YesnoModalActionTypeNames.CLOSE_MODAL: {
            return initialYesnoModalStateProps();
        }

        case YesnoModalActionTypeNames.OPEN_MODAL: {
            let typedAction = <OpenModalRetType>action
            return Object.assign({}, { ...state }, { show: true, question: typedAction.payload.question, title: typedAction.payload.title });
        }

        default:
            return state
    }
}