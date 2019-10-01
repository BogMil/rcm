import { WARNING_MODAL as namespace } from '../../../../actions/actionNamespaces';
import { WarningModalActionType, WarningModalActionTypeNames } from './warningModal.types';

export function closeModal(): WarningModalActionType {
    return {
        type: WarningModalActionTypeNames.CLOSE_MODAL,
        payload: null,
        namespace
    }
}

export function openModal(message: string): WarningModalActionType {
    return {
        type: WarningModalActionTypeNames.OPEN_MODAL,
        payload: { message },
        namespace
    }
}