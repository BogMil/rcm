import React from "react";

import ReactCrudMaster from '../reactCrudMaster.component';
import {
    render,
    cleanup
} from '@testing-library/react';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../../../rootReducer";
import thunk from "redux-thunk";
import * as CrudMasterConstants from '../reactCrudMaster.constants'
import * as TestData from '../../../testData'

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

let colModels = TestData.colModels();
let data = TestData.data();
let store;

beforeEach(() => {
    store = createStore(rootReducer, applyMiddleware(thunk));
});

afterEach(cleanup)

describe('<ReactCrudMaster/>', () => {
    describe('with provided data', () => {

        it('shoult render without problems', () => {
            renderReactCrudMaster();
        })

        it('shoult render default table title', () => {
            renderReactCrudMaster();

            let x = document.body.querySelector('.cm-table-header')
            expect(x.textContent).toBe(CrudMasterConstants.DEFAULT_TABLE_TITLE)
        })
        it('shoult render custom table title', () => {

            const customTitle = 'Custom Title';
            render(
                <Provider store={store}>
                    <ReactCrudMaster dataProp={data} colModelsProp={colModels} tableTitle={customTitle} />
                </Provider>
            )
            let x = document.body.querySelector('.cm-table-header')
            expect(x.textContent).toBe(customTitle)
        })

        describe('renders proper number of elements', () => {

            it('shoult render more than 0 label-width-tester for geting with of label in pixel', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('#label-width-tester')
                expect(x.length).not.toBe(0)
            })

            it('shoult render one react-crud-master div', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('.react-crud-master')
                expect(x.length).toBe(1)

            })

            it('shoult render one cm-table-body div', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('.cm-table-body')
                expect(x.length).toBe(1)
            })

            it('shoult render one cm-data-table-holder div', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('.cm-data-table-holder')
                expect(x.length).toBe(1)
            })

            it('shoult render one cm-table-header-holder div', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('.cm-table-header-holder')
                expect(x.length).toBe(1)
            })

            it('shoult render one reactable-data-table-holder div', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('.reactable-data-table-holder')
                expect(x.length).toBe(1)
            })

            it('shoult render one cm-table-footer-holder div', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('.cm-table-footer-holder')
                expect(x.length).toBe(1)
            })

            it('shoult render one cm-table-footer div', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('.cm-table-footer')
                expect(x.length).toBe(1)
            })

            it('shoult render one cm-context-menu-modal div', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('.cm-context-menu-modal')
                expect(x.length).toBe(1)
            })

            it('shoult render zero cm-crud-modal div', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('.cm-crud-modal')
                expect(x.length).toBe(0)
            })

            it('shoult render zero cm-colmenu-modal div', () => {
                renderReactCrudMaster();
                let x = document.body.querySelectorAll('.cm-colmenu-modal')
                expect(x.length).toBe(0)
            })

        })
    })

})

const renderReactCrudMaster = () => {
    return render(
        <Provider store={store}>
            <ReactCrudMaster dataProp={data} colModelsProp={colModels} />
        </Provider>
    )
}


