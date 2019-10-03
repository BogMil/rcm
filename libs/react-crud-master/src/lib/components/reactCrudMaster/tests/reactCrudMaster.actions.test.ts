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
import { AssertionError } from 'assert';
import { orderColumns } from '../reactCrudMaster.actions';

afterEach(cleanup)
describe('ReactCrudMaster.actions', () => {

    describe('privateSetColModels', () => {
        it('privateSetColModels should return proper object', () => {
            let colModels = orderColumns(TestData.colModels())

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

        describe('ordering column position properly', () => {
            test('when all colModels have defined columnPosition', () => {
                let colModels = [
                    new ColModel({
                        name: "Id",
                        columnPosition: 5
                    }),

                    new ColModel({
                        name: "FirstName",
                        columnPosition: 3
                    }),
                    new ColModel({
                        name: "LastName",
                        columnPosition: 1
                    }),
                    new ColModel({
                        name: "Username",
                        columnPosition: 4
                    }),
                    new ColModel({
                        name: "Contact",
                        columnPosition: 2
                    })
                ]

                let actionResult = ReactCrudMasterActions.privateSetColModels(colModels);
                let actualResult = actionResult.payload.colModels.map(x => x.name);

                let expectedResult = [colModels[2].name, colModels[4].name, colModels[1].name, colModels[3].name, colModels[0].name];
                expect(actualResult).toStrictEqual(expectedResult);
            });

            test('when some colModels have defined columnPosition', () => {
                let colModels = [
                    new ColModel({
                        name: "Id",
                        columnPosition: null
                    }),

                    new ColModel({
                        name: "FirstName",
                        columnPosition: 3
                    }),
                    new ColModel({
                        name: "LastName",
                        columnPosition: 1
                    }),
                    new ColModel({
                        name: "Username",
                        columnPosition: null
                    }),
                    new ColModel({
                        name: "Contact",
                        columnPosition: 2
                    })
                ]

                let actionResult = ReactCrudMasterActions.privateSetColModels(colModels);
                let actualResult = actionResult.payload.colModels.map(x => x.name);

                let expectedResult = [colModels[2].name, colModels[4].name, colModels[1].name, colModels[0].name, colModels[3].name];
                expect(actualResult).toStrictEqual(expectedResult);
            });

            test('when colModels have defined columnPosition greater than posible', () => {
                let colModels = [
                    new ColModel({
                        name: "Id",
                        columnPosition: 8
                    }),

                    new ColModel({
                        name: "FirstName",
                        columnPosition: 7
                    }),
                    new ColModel({
                        name: "LastName",
                        columnPosition: 5
                    }),
                    new ColModel({
                        name: "Username",
                        columnPosition: 9
                    }),
                    new ColModel({
                        name: "Contact",
                        columnPosition: 6
                    })
                ]

                let actionResult = ReactCrudMasterActions.privateSetColModels(colModels);
                let actualNameOrder = actionResult.payload.colModels.map(x => x.name);
                let actualColPosOrder = actionResult.payload.colModels.map(x => x.columnPosition);

                let expectedNameOrder = [colModels[2].name, colModels[4].name, colModels[1].name, colModels[0].name, colModels[3].name];

                expect(actualNameOrder).toStrictEqual(expectedNameOrder);

                expect(actualColPosOrder).toStrictEqual([0, 1, 2, 3, 4]);
            });

            test('when some colModels have same columnPosition greater than posible', () => {
                let colModels = [
                    new ColModel({
                        name: "Id",
                        columnPosition: 1
                    }),

                    new ColModel({
                        name: "FirstName",
                        columnPosition: 3
                    }),
                    new ColModel({
                        name: "LastName",
                        columnPosition: 2
                    }),
                    new ColModel({
                        name: "Username",
                        columnPosition: 2
                    }),
                    new ColModel({
                        name: "Contact",
                        columnPosition: 3
                    })
                ]

                let actionResult = ReactCrudMasterActions.privateSetColModels(colModels);
                let actualNameOrder = actionResult.payload.colModels.map(x => x.name);
                let actualColPosOrder = actionResult.payload.colModels.map(x => x.columnPosition);

                let expectedNameOrder = [colModels[0].name, colModels[2].name, colModels[3].name, colModels[1].name, colModels[4].name];

                expect(actualNameOrder).toStrictEqual(expectedNameOrder);

                expect(actualColPosOrder).toStrictEqual([0, 1, 2, 3, 4]);
            });
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
