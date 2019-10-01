import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
} from '@testing-library/react';
import { ColModel } from '../../../types/colModel';
import * as CrudModalActions from '../../crudModal/crudModal.actions'
import * as TestData from '../../../testData'
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { CRUD_MODAL as namespace } from '../../../actions/actionNamespaces'
import { CrudModalActionTypeNames, CrudModalActionType } from '../CrudModal.types'

afterEach(cleanup)
describe('CrudModal.actions', () => {

    it('closeModal', () => {

        let expectedResult = {
            type: CrudModalActionTypeNames.CLOSE_MODAL,
            payload: null,
            namespace: namespace
        }
        let actionResult = CrudModalActions.closeModal();

        expect(actionResult).toMatchObject(expectedResult)
    })

    it('openModalToCreate', () => {

        let expectedResult = {
            type: CrudModalActionTypeNames.OPEN_MODAL_TO_CREATE,
            payload: null,
            namespace: namespace
        }
        let actionResult = CrudModalActions.openModalToCreate();

        expect(actionResult).toMatchObject(expectedResult)
    })

    it('generateColNamePropertiesInRowData', () => {
        let colModels = TestData.colModels();
        let expectedResult = {
            type: CrudModalActionTypeNames.GENERATE_COL_NAME_PROPERTIES_IN_ROW_DATA,
            payload: { colModels },
            namespace: namespace
        }
        let actionResult = CrudModalActions.generateColNamePropertiesInRowData(colModels);

        expect(actionResult).toMatchObject(expectedResult)
    })

    it('onRowDataChange', () => {

        let expectedResult = {
            type: CrudModalActionTypeNames.ON_ROW_DATA_CHANGE,
            payload: { name: 'asd', value: 'fgh' },
            namespace: namespace
        }
        let actionResult = CrudModalActions.onRowDataChange('asd', 'fgh');

        expect(actionResult).toMatchObject(expectedResult)
    })
})
