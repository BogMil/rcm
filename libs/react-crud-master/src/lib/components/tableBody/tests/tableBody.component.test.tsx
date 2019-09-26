import React from "react";

import {
    render,
    cleanup,
    fireEvent
} from '@testing-library/react';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../../../rootReducer";
import thunk from "redux-thunk";
import * as TestData from '../../../testData'
import TableBody from '../TableBody.component';
import { ReactCrudMasterActionTypeNames } from '../../reactCrudMaster/reactCrudMaster.types'
import { REACT_CRUD_MASTER } from '../../../actions/actionNamespaces';
import * as ReactCrudMasterActions from '../../reactCrudMaster/reactCrudMaster.actions'
import configureMockStore from 'redux-mock-store'
import { shouldRenderNumberOfTimesWithCssClass } from '../../../utils/testHelpers'


let colModels = TestData.colModels();
let data = TestData.data();
let store;

beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));
});

afterEach(cleanup)

describe('<TableBody/>', () => {

    it('shoult render without problems', () => {
        renderComponent();
    })

    describe('renders proper number of elements', () => {

        it('shoult render one => cm-table-header-holder', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-data-table-holder', renderComponent))
        it('shoult render one => cm-data-table', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-data-table', renderComponent))
        it('shoult render one => cm-data-table-tbody', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-data-table-tbody', renderComponent))

        it('shoult render proper number of => cm-data-row', () => {
            store.dispatch(ReactCrudMasterActions.setData(data))
            store.dispatch(ReactCrudMasterActions.setColModels(colModels))
            shouldRenderNumberOfTimesWithCssClass(data.length, 'cm-data-row', renderComponent);
        })

        it('shoult render proper number of => cm-data-cell', () => {
            store.dispatch(ReactCrudMasterActions.setData(data))
            store.dispatch(ReactCrudMasterActions.setColModels(colModels))
            shouldRenderNumberOfTimesWithCssClass(data.length * colModels.length, 'cm-data-cell', renderComponent);
        })
    })

    // describe('renders proper text content', () => {

    //     it('shoult render proper labels of column  headers', () => {
    //         store.dispatch(ReactCrudMasterActions.setData(data))
    //         store.dispatch(ReactCrudMasterActions.setColModels(colModels))
    //         renderComponent()
    //         let x = document.body.querySelectorAll('.cm-column-header-label');

    //         for (var i = 0; i < colModels.length; i++) {
    //             expect(x[i].textContent).toBe(colModels[i].label)
    //         }
    //     })

    test('that onClickOnRow should dispatch proper actions', () => {

        let mockedStore = configureMockStore()({
            reactCrudMaster: {
                data,
                colModels
            },
            contextMenuModal: {}
        });
        mockedStore.dispatch = jest.fn();

        render(
            <Provider store={mockedStore}>
                <TableBody />
            </Provider>
        )

        let x = document.body.querySelectorAll('.cm-data-row');

        fireEvent.click(x[0])

        expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
        expect(mockedStore.dispatch).toHaveBeenCalledWith(
            {
                type: ReactCrudMasterActionTypeNames.SELECT_ROW,
                namespace: REACT_CRUD_MASTER,
                payload: { row: data[0] }
            }
        );
    })

    test('that onRightClickOnRow should dispatch proper actions', () => {
        let mockedStore = configureMockStore()({
            reactCrudMaster: {
                data,
                colModels
            },
            contextMenuModal: {
                contextMenuTrigger: {
                    handleContextClick: jest.fn()
                }
            }
        });
        mockedStore.dispatch = jest.fn();

        render(
            <Provider store={mockedStore}>
                <TableBody />
            </Provider>
        )

        let x = document.body.querySelectorAll('.cm-data-row');

        fireEvent.contextMenu(x[0])

        expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
        expect(mockedStore.getState().contextMenuModal.contextMenuTrigger.handleContextClick).toHaveBeenCalledTimes(1);
        expect(mockedStore.dispatch).toHaveBeenCalledWith(
            {
                type: ReactCrudMasterActionTypeNames.SELECT_ROW,
                namespace: REACT_CRUD_MASTER,
                payload: { row: data[0] }
            }
        );
    })
    // })

})

const renderComponent = () => {
    return render(
        <Provider store={store}>
            <TableBody />
        </Provider>
    )
}



