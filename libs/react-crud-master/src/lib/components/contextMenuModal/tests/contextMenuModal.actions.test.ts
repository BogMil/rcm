import {
    cleanup,
} from '@testing-library/react';
import * as contextMenuModalActions from '../contextMenuModal.actions'
import { CONTEXT_MENU_MODAL as namespace } from '../../../actions/actionNamespaces'
import { ContextMenuModalActionTypeNames } from '../contextMenuModal.types'

afterEach(cleanup)
describe('ReactCrudMaster.actions', () => {

    it('closeModal should return proper object', () => {
        let expectedResult = {
            type: ContextMenuModalActionTypeNames.SET_CONTEXT_MENU_TRIGGER_REF,
            payload: { ref: 1 },
            namespace
        }

        let actionResult = contextMenuModalActions.setContextMenuTriggerRef(1);
        expect(actionResult).toMatchObject(expectedResult)
    })
})
