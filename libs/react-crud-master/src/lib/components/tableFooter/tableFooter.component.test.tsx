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
import { CRUD_MODAL } from '../../actions/actionNamespaces';
import * as ReactCrudMasterActions from '../reactCrudMaster/reactCrudMaster.actions'
import configureMockStore from 'redux-mock-store'
import { shouldRenderNumberOfTimesWithCssClass } from '../../utils/testHelpers'
import { CrudModalActionTypeNames } from '../crudModal/crudModal.types'
import * as FontAwesomeClasses from '../../FontAwesomeClasses'


let colModels = TestData.colModels();
let data = TestData.data();
let store;

beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));
});

afterEach(cleanup)

describe('<TableFooter/>', () => {

    describe('on xs', () => {
        const width = 500;
        it('shoult render without problems', () => {
            renderComponent(width);
        })
        it('shoult render one => cm-table-footer', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-table-footer', () => renderComponent(width)));
        it('shoult render 0 => cm-table-footer-lg', () => shouldRenderNumberOfTimesWithCssClass(0, 'cm-table-footer-lg', () => renderComponent(width)));
        it('shoult render one => cm-table-footer-xs', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-table-footer-xs', () => renderComponent(width)));
        it('shoult render one => cm-crud-menu-button', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-crud-menu-button', () => renderComponent(width)));
        it('shoult render one => cm-pagination-holder', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-pagination-holder', () => renderComponent(width)));
        it('shoult render one => next page button', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-next-page-btn', () => renderComponent(width)));
        it('shoult render one => previous page button', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-previous-page-btn', () => renderComponent(width)));
        it('shoult render 0 => first page button', () => shouldRenderNumberOfTimesWithCssClass(0, 'cm-first-page-btn', () => renderComponent(width)));
        it('shoult render 0 =>  last page button', () => shouldRenderNumberOfTimesWithCssClass(0, 'cm-last-page-btn', () => renderComponent(width)));

        it('shoult render one => cm-add-btn sm screen', () => shouldRenderOneButton('cm-add-btn'));

        it('shoult render one =>  page number input', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-page-number-input', () => renderComponent(width)));


        function shouldRenderOneButton(className) {
            renderComponent(500)
            let buttons = document.body.querySelectorAll('.' + className);
            expect(buttons.length).toBe(0)

            let x = document.body.querySelectorAll('.cm-crud-menu-button');
            fireEvent.click(x[0]);

            buttons = document.body.querySelectorAll('.' + className);
            expect(buttons.length).toBe(1)
        }

        describe("caling proper actions", () => {
            test('that click on add dispatch proper actions', () => {

                let mockedStore = configureMockStore()({});
                mockedStore.dispatch = jest.fn();

                render(
                    <Provider store={mockedStore} >
                        <TableFooter tableWidth={width} />
                    </Provider>
                )

                let menuHamburgerBtn = document.body.querySelectorAll('.cm-crud-menu-button');
                fireEvent.click(menuHamburgerBtn[0]);

                let addBtn = document.body.querySelectorAll('.cm-add-btn')[0];
                fireEvent.click(addBtn)

                expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
                expect(mockedStore.dispatch).toHaveBeenCalledWith(
                    {
                        type: CrudModalActionTypeNames.OPEN_MODAL,
                        namespace: CRUD_MODAL,
                        payload: null
                    }
                );
            })
        })
    });

    describe(' (above 620px)', () => {
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
        it('shoult render one => cm-pagination-holder', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-pagination-holder', () => renderComponent(width)));

        it('shoult render one => next page button', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-next-page-btn', () => renderComponent(width)));
        it('shoult render one => previous page button', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-previous-page-btn', () => renderComponent(width)));
        it('shoult render one => first page button', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-first-page-btn', () => renderComponent(width)));
        it('shoult render one =>  last page button', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-last-page-btn', () => renderComponent(width)));
        it('shoult render one =>  page number input', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-page-number-input', () => renderComponent(width)));

        describe("caling proper actions", () => {
            test('that click on add dispatch proper actions', () => {

                let mockedStore = configureMockStore()({});
                mockedStore.dispatch = jest.fn();

                render(
                    <Provider store={mockedStore} >
                        <TableFooter tableWidth={900} />
                    </Provider>
                )

                let x = document.body.querySelectorAll('.cm-add-btn');
                fireEvent.click(x[0])

                expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
                expect(mockedStore.dispatch).toHaveBeenCalledWith(
                    {
                        type: CrudModalActionTypeNames.OPEN_MODAL,
                        namespace: CRUD_MODAL,
                        payload: null
                    }
                );
            })
        })
    })

})

const renderComponent = (tableWidth: number) => {
    return render(
        <Provider store={store} >
            <TableFooter tableWidth={tableWidth} />
        </Provider>
    )
}



