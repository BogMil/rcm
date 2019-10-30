import { VModalStateProps, initialVModalStateProps, VModalActionType, VModalActionTypeNames } from './vModal.types'
import update from 'immutability-helper'
import { ColModel } from '../../types/colModel/colModel';
import { V_MODAL as NAMESPACE } from '../../actions/actionNamespaces';
export const initialState = {
    colModels: [],
    data: [],
    width: 0,
    sortColumn: null,
    selectedRow: null,
    startOffset: 0,
    columnToResize: null,
    show: false,
    reactableId: Date.now(),
    modalState: null,
    tableWidth: 0,
    emptyModalState: null
}

export function vModalReducer(
    state: VModalStateProps = initialVModalStateProps(),
    action: VModalActionType
): VModalStateProps {
    if (action.namespace != NAMESPACE)
        return state;

    switch (action.type) {

        case VModalActionTypeNames.CLOSE_MODAL: {
            return Object.assign({}, { ...state }, { show: false, rowData: {} });
        }

        case VModalActionTypeNames.OPEN_MODAL: {
            return Object.assign({}, { ...state }, { show: true });
        }

        default:
            return state
    }
}