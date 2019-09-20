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
import TableHeader from '../tableHeader.component';
import { ReactCrudMasterActionTypeNames } from '../../reactCrudMaster/reactCrudMaster.types'
import { REACT_CRUD_MASTER } from '../../../actions/actionNamespaces';
import * as ReactCrudMasterActions from '../../reactCrudMaster/reactCrudMaster.actions'
import configureMockStore from 'redux-mock-store'


let colModels = TestData.colModels();
let data = TestData.data();
let store;

beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));
});

afterEach(cleanup)

describe('<TableHeader/>', () => {

    it('shoult render without problems', () => {
        renderComponent();
    })

    describe('renders proper number of elements', () => {

        it('shoult render one => cm-table-header-holder', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-table-header-holder'))
        it('shoult render one => cm-header-table', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-header-table'))
        it('shoult render one => cm-header-table-thead', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-header-table-thead'))

        it('shoult render proper number of times => cm-header-table-colum-header', () => {
            store.dispatch(ReactCrudMasterActions.setData(data))
            store.dispatch(ReactCrudMasterActions.setColModels(colModels))
            shouldRenderNumberOfTimesWithCssClass(colModels.length, 'cm-header-table-colum-header');
        })

        it('shoult render proper number of => cm-column-header-label', () => {
            store.dispatch(ReactCrudMasterActions.setData(data))
            store.dispatch(ReactCrudMasterActions.setColModels(colModels))
            shouldRenderNumberOfTimesWithCssClass(colModels.length, 'cm-column-header-label');
        })

        it('shoult render proper number of => cm-column-header-menu-holder', () => {
            store.dispatch(ReactCrudMasterActions.setData(data))
            store.dispatch(ReactCrudMasterActions.setColModels(colModels))
            shouldRenderNumberOfTimesWithCssClass(colModels.length, 'cm-column-header-menu-holder');
        })

        it('shoult render proper number of => cm-column-header-resize-bar', () => {
            store.dispatch(ReactCrudMasterActions.setData(data))
            store.dispatch(ReactCrudMasterActions.setColModels(colModels))
            shouldRenderNumberOfTimesWithCssClass(colModels.length, 'cm-column-header-resize-bar');
        })
    })

    describe('renders proper text content', () => {

        it('shoult render proper labels of column  headers', () => {
            store.dispatch(ReactCrudMasterActions.setData(data))
            store.dispatch(ReactCrudMasterActions.setColModels(colModels))
            renderComponent()
            let x = document.body.querySelectorAll('.cm-column-header-label');

            for (var i = 0; i < colModels.length; i++) {
                expect(x[i].textContent).toBe(colModels[i].label)
            }
        })

        it('click on column header col menu button should change state of modal to true', () => {
            store.dispatch(ReactCrudMasterActions.setData(data))
            store.dispatch(ReactCrudMasterActions.setColModels(colModels))
            renderComponent()
            let x = document.body.querySelectorAll('.cm-column-header-menu-btn');

            expect(store.getState().colMenuModal.show).toBe(false);
            fireEvent.click(x[0]);
            expect(store.getState().colMenuModal.show).toBe(true);
        })

        it('clicks on column header label should add proper sort desctiption to label', () => {
            store.dispatch(ReactCrudMasterActions.setData(data))
            store.dispatch(ReactCrudMasterActions.setColModels(colModels))
            renderComponent()
            let x = document.body.querySelectorAll('.cm-column-header-label');
            let label = x[0];

            expect(label.textContent).toBe(colModels[0].label);
            fireEvent.click(label);
            expect(label.textContent).toBe("asc " + colModels[0].label);

            fireEvent.click(label);
            expect(label.textContent).toBe("desc " + colModels[0].label);
            fireEvent.click(label);
            expect(label.textContent).toBe(colModels[0].label);
        })

        it('clicks on resizeBar should dispatch proper actions', () => {

            let mockedStore = configureMockStore()({
                reactCrudMaster: {
                    data,
                    colModels
                }
            });
            mockedStore.dispatch = jest.fn();

            render(
                <Provider store={mockedStore}>
                    <TableHeader />
                </Provider>
            )

            let x = document.body.querySelectorAll('.cm-column-header-resize-bar');

            fireEvent.mouseDown(x[0])

            expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
            expect(mockedStore.dispatch).toHaveBeenCalledWith(
                {
                    type: ReactCrudMasterActionTypeNames.SET_COLUMN_TO_RESIZE,
                    payload: {
                        startOffset: NaN,
                        column: colModels[0]
                    },
                    namespace: REACT_CRUD_MASTER,
                }
            );
        })
    })

})

const renderComponent = () => {
    return render(
        <Provider store={store}>
            <TableHeader />
        </Provider>
    )
}

const shouldRenderNumberOfTimesWithCssClass = (numberOfTimes: number, className: string) => {
    renderComponent();
    let x = document.body.querySelectorAll(`.${className}`)
    expect(x.length).toBe(numberOfTimes)
}


