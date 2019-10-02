import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
} from '@testing-library/react';
import { ColModel } from '../../../types/colModel';
import * as ReactCrudMasterActions from '../reactCrudMaster.actions'
import * as CrudModalActions from '../../crudModal/crudModal.actions'
import { SetColModelsRetType } from '../reactCrudMaster.types';
import * as TestData from '../../../testData'
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { REACT_CRUD_MASTER } from '../../../actions/actionNamespaces'
import { ReactCrudMasterActionTypeNames, ReactCrudMasterActionType } from '../reactCrudMaster.types'

afterEach(cleanup)
describe('ReactCrudMaster.actions', () => {

    describe('privateSetColModels', () => {
        it('privateSetColModels should return proper object', () => {
            let colModels = TestData.colModels()

            let widthsOfColumns = colModels.map(colModel => colModel.width)
            let expectedTableWitdh = widthsOfColumns.reduce((prev, current) => prev += current)

            let expectedResult = {
                type: ReactCrudMasterActionTypeNames.SET_COL_MODELS,
                payload: {
                    colModels: colModels,
                    tableWidth: expectedTableWitdh
                },
                namespace: REACT_CRUD_MASTER
            }

            let actionResult = ReactCrudMasterActions.privateSetColModels(colModels);

            expect(actionResult).toMatchObject(expectedResult)
        })
    })

    describe('setColModels', () => {
        it('should dispatch proper actions', async () => {
            let store = configureMockStore([thunk])();
            let colModels = TestData.colModels()

            await store.dispatch(ReactCrudMasterActions.setColModels(colModels));
            const actions = store.getActions();
            expect(actions[0]).toEqual(ReactCrudMasterActions.privateSetColModels(colModels));
            expect(actions[1]).toEqual(CrudModalActions.generateColNamePropertiesInRowData(colModels));
            expect(actions.length).toBe(2);
        })
    })

    describe('setData', () => {
        it('should return proper object', () => {
            let data = TestData.data()

            let expectedResult = {
                type: ReactCrudMasterActionTypeNames.SET_DATA,
                payload: { data: data },
                namespace: REACT_CRUD_MASTER
            }
            let actionResult = ReactCrudMasterActions.setData(data);

            expect(actionResult).toMatchObject(expectedResult)
        })
    })

    describe('resizeColumn', () => {
        it('should return proper object', () => {
            let e = new MouseEvent('mousemove')

            let expectedResult = {
                type: ReactCrudMasterActionTypeNames.RESIZE_COLUMN,
                payload: { e },
                namespace: REACT_CRUD_MASTER
            }
            let actionResult = ReactCrudMasterActions.resizeColumn(e);

            expect(actionResult).toMatchObject(expectedResult)
        })
    })

    describe('setColumnToResize', () => {
        it('should return proper object', () => {
            let colModel = TestData.colModels()[0];
            let startOffset = 0;

            let expectedResult = {
                type: ReactCrudMasterActionTypeNames.SET_COLUMN_TO_RESIZE,
                payload: { startOffset, column: colModel },
                namespace: REACT_CRUD_MASTER
            }
            let actionResult = ReactCrudMasterActions.setColumnToResize(colModel, startOffset);
            expect(actionResult).toMatchObject(expectedResult)
        })
    })

    describe('resetTableoffsetWidth', () => {
        it('should return proper object', () => {

            let expectedResult = {
                type: ReactCrudMasterActionTypeNames.SET_INITIAL_TABLE_OFFSET_WIDTH,
                namespace: REACT_CRUD_MASTER,
                payload: null
            }
            let actionResult = ReactCrudMasterActions.resetTableoffsetWidth();
            expect(actionResult).toMatchObject(expectedResult)
        })
    })

    describe('changeOrderDirection', () => {
        it('should return proper object', () => {
            let colModel = TestData.colModels()[0];
            let e: any = 1;

            let expectedResult = {
                type: ReactCrudMasterActionTypeNames.CHANGE_ORDER_DIRECTION,
                namespace: REACT_CRUD_MASTER,
                payload: { column: colModel }
            }
            let actionResult = ReactCrudMasterActions.changeOrderDirection(colModel);
            expect(actionResult).toMatchObject(expectedResult)
        })
    })

    describe('selectRow', () => {
        it('should return proper object', () => {
            let row: any = null;

            let expectedResult = {
                type: ReactCrudMasterActionTypeNames.SELECT_ROW,
                namespace: REACT_CRUD_MASTER,
                payload: { row }
            }
            let actionResult = ReactCrudMasterActions.selectRow(row);
            expect(actionResult).toMatchObject(expectedResult)
        })
    })

    describe('setTableTitle', () => {
        it('should return proper object', () => {
            let tableTitle: any = "test";

            let expectedResult = {
                type: ReactCrudMasterActionTypeNames.SET_TABLE_TITLE,
                namespace: REACT_CRUD_MASTER,
                payload: { tableTitle }
            }
            let actionResult = ReactCrudMasterActions.setTableTitle(tableTitle);
            expect(actionResult).toMatchObject(expectedResult)
        })
    })

})
