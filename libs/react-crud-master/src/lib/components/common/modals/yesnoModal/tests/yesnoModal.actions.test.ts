import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
} from '@testing-library/react';
import * as yesnoModalActions from '../../yesnoModal/yesnoModal.actions'
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { YESNO_MODAL as namespace } from '../../../../../actions/actionNamespaces'
import { YesnoModalActionTypeNames } from '../yesnoModal.types'

afterEach(cleanup)
describe('yesnoModal.actions', () => {

    it('closeModal', () => {

        let expectedResult = {
            type: YesnoModalActionTypeNames.CLOSE_MODAL,
            payload: null,
            namespace
        }
        let actionResult = yesnoModalActions.closeModal();

        expect(actionResult).toMatchObject(expectedResult)
    })

    it('openModal', () => {

        let expectedResult = {
            type: YesnoModalActionTypeNames.OPEN_MODAL,
            payload: { title: 'asdf', question: 'ghjk' },
            namespace
        }
        let actionResult = yesnoModalActions.openModal('asdf', 'ghjk', () => { console.log('test') });

        expect(actionResult).toMatchObject(expectedResult)
    })

})
