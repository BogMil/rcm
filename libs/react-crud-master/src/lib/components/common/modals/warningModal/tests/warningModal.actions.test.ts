import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
} from '@testing-library/react';
import * as WarningModalActions from '../../warningModal/WarningModal.actions'
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { WARNING_MODAL as namespace } from '../../../../../actions/actionNamespaces'
import { WarningModalActionTypeNames, WarningModalActionType } from '../warningModal.types'

afterEach(cleanup)
describe('WarningModal.actions', () => {

    it('closeModal', () => {

        let expectedResult = {
            type: WarningModalActionTypeNames.CLOSE_MODAL,
            payload: null,
            namespace: namespace
        }
        let actionResult = WarningModalActions.closeModal();

        expect(actionResult).toMatchObject(expectedResult)
    })

    it('openModal', () => {

        let expectedResult = {
            type: WarningModalActionTypeNames.OPEN_MODAL,
            payload: { message: 'asdfghjk' },
            namespace: namespace
        }
        let actionResult = WarningModalActions.openModal('asdfghjk');

        expect(actionResult).toMatchObject(expectedResult)
    })

})
