import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
} from '@testing-library/react';
import { ColModel } from '../../../types/colModel';
import * as ColMenuModalActions from '../colMenuModal.actions'
import * as CrudModalActions from '../../crudModal/crudModal.actions'
import * as TestData from '../../../testData'
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { COL_MENU_MODAL as namespace } from '../../../actions/actionNamespaces'
import { ColMenuModalActionTypeNames, ColMenuModalActionType } from '../colMenuModal.types'

afterEach(cleanup)
describe('ReactCrudMaster.actions', () => {
    let colModels = TestData.colModels()

    it('closeModal should return proper object', () => {
        let expectedResult = {
            type: ColMenuModalActionTypeNames.CLOSE_MODAL,
            payload: null,
            namespace
        }

        let actionResult = ColMenuModalActions.closeModal();
        expect(actionResult).toMatchObject(expectedResult)
    })

    it('privateSetColModels should return proper object', () => {
        let expectedResult = {
            type: ColMenuModalActionTypeNames.OPEN_MODAL,
            payload: { colModel: colModels[2] },
            namespace
        }

        let actionResult = ColMenuModalActions.openModal(colModels[2]);
        expect(actionResult).toMatchObject(expectedResult)
    })

})
