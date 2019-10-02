import { YESNO_MODAL as namespace } from '../../../../actions/actionNamespaces';
import { YesnoModalActionType, YesnoModalActionTypeNames } from './yesnoModal.types';
import * as GlobalVariableNames from '../../../../globalVariableNames'


export function closeModal(): YesnoModalActionType {
    return {
        type: YesnoModalActionTypeNames.CLOSE_MODAL,
        payload: null,
        namespace
    }
}

export function openModal(title: string, question: string, onConfirm: Function, onDeny?: Function): YesnoModalActionType {
    window[GlobalVariableNames.ON_YESNO_MODAL_CONFIRM] = onConfirm;
    window[GlobalVariableNames.ON_YESNO_MODAL_DENY] = onDeny;
    return {
        type: YesnoModalActionTypeNames.OPEN_MODAL,
        payload: { question, title },
        namespace
    }
}