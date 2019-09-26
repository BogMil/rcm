import React from "react";

import {
    render,
    cleanup,
    fireEvent
} from '@testing-library/react';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../../rootReducer";
import thunk from "redux-thunk";
import * as TestData from '../../testData'
import TableFooter from './TableFooter.component';
import { ReactCrudMasterActionTypeNames } from '../reactCrudMaster/reactCrudMaster.types'
import { REACT_CRUD_MASTER } from '../../actions/actionNamespaces';
import * as ReactCrudMasterActions from '../reactCrudMaster/reactCrudMaster.actions'
import configureMockStore from 'redux-mock-store'
import { shouldRenderNumberOfTimesWithCssClass } from '../../utils/testHelpers'


let colModels = TestData.colModels();
let data = TestData.data();
let store;

beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));
});

afterEach(cleanup)

describe('<TableFooter/>', () => {

    describe('on xs', () => {
        it('shoult render without problems', () => {
            renderComponent(500);
        })
        it('shoult render one => cm-table-footer', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-table-footer', () => renderComponent(500)));
        it('shoult render 0 => cm-table-footer-lg', () => shouldRenderNumberOfTimesWithCssClass(0, 'cm-table-footer-lg', () => renderComponent(500)));
        it('shoult render one => cm-table-footer-xs', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-table-footer-xs', () => renderComponent(500)));
        it('shoult render one => cm-crud-menu-button', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-crud-menu-button', () => renderComponent(500)));

        it('shoult render one => cm-add-btn sm screen', () => shouldRenderOneButton('cm-add-btn'));

        function shouldRenderOneButton(className) {
            renderComponent(500)
            let buttons = document.body.querySelectorAll('.' + className);
            expect(buttons.length).toBe(0)

            let x = document.body.querySelectorAll('.cm-crud-menu-button');
            fireEvent.click(x[0]);

            buttons = document.body.querySelectorAll('.' + className);
            expect(buttons.length).toBe(1)
        }

    });

    describe('renders proper number of elements onlarge screen (above 620px)', () => {
        const width = 800
        it('shoult render without problems', () => {
            renderComponent(width);
        })
        it('shoult render one => cm-table-footer', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-table-footer', () => renderComponent(width)));
        it('shoult render one => cm-table-footer-lg', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-table-footer-lg', () => renderComponent(width)));
        it('shoult render 0 => cm-table-footer-xs', () => shouldRenderNumberOfTimesWithCssClass(0, 'cm-table-footer-xs', () => renderComponent(width)));
        it('shoult render 0 => cm-crud-menu-button', () => shouldRenderNumberOfTimesWithCssClass(0, 'cm-crud-menu-button', () => renderComponent(width)));

        it('shoult render one => cm-add-btn', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-add-btn', () => renderComponent(width)));
        it('shoult render one => cm-edit-btn', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-edit-btn', () => renderComponent(width)));
        it('shoult render one => cm-del-btn', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-del-btn', () => renderComponent(width)));
        it('shoult render one => cm-view-btn', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-view-btn', () => renderComponent(width)));
        it('shoult render one => cm-search-btn', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-search-btn', () => renderComponent(width)));


        // it('shoult render proper number of => cm-data-cell', () => {
        //     store.dispatch(ReactCrudMasterActions.setData(data))
        //     store.dispatch(ReactCrudMasterActions.setColModels(colModels))
        //     shouldRenderNumberOfTimesWithCssClass(data.length * colModels.length, 'cm-data-cell', renderComponent);
        // })
    })

    // test('that onClickOnRow should dispatch proper actions', () => {

    //     let mockedStore = configureMockStore()({
    //         reactCrudMaster: {
    //             data,
    //             colModels
    //         },
    //         contextMenuModal: {}
    //     });
    //     mockedStore.dispatch = jest.fn();

    //     render(
    //         <Provider store={mockedStore} >
    //             <TableFooter />
    //         </Provider>
    //     )

    //     let x = document.body.querySelectorAll('.cm-data-row');

    //     fireEvent.click(x[0])

    //     expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
    //     expect(mockedStore.dispatch).toHaveBeenCalledWith(
    //         {
    //             type: ReactCrudMasterActionTypeNames.SELECT_ROW,
    //             namespace: REACT_CRUD_MASTER,
    //             payload: { row: data[0] }
    //         }
    //     );
    // })

    // test('that onRightClickOnRow should dispatch proper actions', () => {
    //     let mockedStore = configureMockStore()({
    //         reactCrudMaster: {
    //             data,
    //             colModels
    //         },
    //         contextMenuModal: {
    //             contextMenuTrigger: {
    //                 handleContextClick: jest.fn()
    //             }
    //         }
    //     });
    //     mockedStore.dispatch = jest.fn();

    //     render(
    //         <Provider store={mockedStore} >
    //             <TableFooter />
    //         </Provider>
    //     )

    //     let x = document.body.querySelectorAll('.cm-data-row');

    //     fireEvent.contextMenu(x[0])

    //     expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
    //     expect(mockedStore.getState().contextMenuModal.contextMenuTrigger.handleContextClick).toHaveBeenCalledTimes(1);
    //     expect(mockedStore.dispatch).toHaveBeenCalledWith(
    //         {
    //             type: ReactCrudMasterActionTypeNames.SELECT_ROW,
    //             namespace: REACT_CRUD_MASTER,
    //             payload: { row: data[0] }
    //         }
    //     );
    // })

})

const renderComponent = (tableWidth: number) => {
    return render(
        <Provider store={store} >
            <TableFooter tableWidth={tableWidth} />
        </Provider>
    )
}



