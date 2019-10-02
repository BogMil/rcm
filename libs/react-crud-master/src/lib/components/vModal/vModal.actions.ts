import { ColModel } from '../../types/colModel';
import { V_MODAL as namespace } from '../../actions/actionNamespaces';
import cloneDeep from 'lodash/cloneDeep';
import { VModalActionType, VModalActionTypeNames } from './vModal.types';

export function closeModal(): VModalActionType {
    return {
        type: VModalActionTypeNames.CLOSE_MODAL,
        payload: null,
        namespace
    }
}

export function openModal(): VModalActionType {
    return {
        type: VModalActionTypeNames.OPEN_MODAL,
        payload: null,
        namespace
    }
}