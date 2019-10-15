import {
    cleanup,
} from '@testing-library/react';
import * as VModalActions from '../../vModal/vModal.actions'
import { V_MODAL as namespace } from '../../../actions/actionNamespaces'
import { VModalActionTypeNames } from '../VModal.types'

afterEach(cleanup)
describe('VModal.actions', () => {

    it('closeModal', () => {

        let expectedResult = {
            type: VModalActionTypeNames.CLOSE_MODAL,
            payload: null,
            namespace: namespace
        }
        let actionResult = VModalActions.closeModal();

        expect(actionResult).toMatchObject(expectedResult)
    })

    it('openModalToCreate', () => {

        let expectedResult = {
            type: VModalActionTypeNames.OPEN_MODAL,
            payload: null,
            namespace: namespace
        }
        let actionResult = VModalActions.openModal();

        expect(actionResult).toMatchObject(expectedResult)
    })
})
