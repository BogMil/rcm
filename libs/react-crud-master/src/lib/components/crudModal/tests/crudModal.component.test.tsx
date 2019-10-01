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
import CrudModal from '../crudModal.component';
import { ReactCrudMasterActionTypeNames } from '../../reactCrudMaster/reactCrudMaster.types'
import { REACT_CRUD_MASTER } from '../../../actions/actionNamespaces';
import * as ReactCrudMasterActions from '../../reactCrudMaster/reactCrudMaster.actions'
import configureMockStore from 'redux-mock-store'
import { shouldRenderNumberOfTimesWithCssClass } from '../../../utils/testHelpers'
import { CrudModalActionTypeNames, CrudModalActionType } from '../crudModal.types'
import { CRUD_MODAL as namespace } from '../../../actions/actionNamespaces';



let colModels = TestData.colModels();
let data = TestData.data();
let mockedStore

beforeEach(() => {
    mockedStore = configureMockStore()({
        reactCrudMaster: {
            colModels
        },
        crudModal: {
            show: true,
            rowData: data[0]
        }
    });

    mockedStore.dispatch = jest.fn();
});

afterEach(cleanup)

describe('<CrudModal/>', () => {


    it('shoult render without problems', () => {
        renderComponent();
    })

    it('shoult not render', () => {
        mockedStore.getState().crudModal.show = false;
        renderComponent();
        let x = document.body.querySelectorAll('.cm-crud-modal')
        expect(x.length).toBe(0);
    })

    describe('create mode', () => {
        beforeEach(function () {
            mockedStore.getState().crudModal.isInCreateMode = true;
        });
        describe('renders proper number of elements', () => {

            it('shoult render one => cm-colmenu-modal', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-crud-modal', () => renderComponent()))
            it('shoult render proper number of => cm-crud-modal-input-holder', () => {
                shouldRenderNumberOfTimesWithCssClass(colModels.length, 'cm-crud-modal-input-holder', () => renderComponent())
            })
        })

        it('should dispatch proper action on input change', () => {

            renderComponent()
            let input = document.body.querySelectorAll('.cm-crud-modal-text-input')[0];
            fireEvent.change(input, { target: { value: 'aa' } })
            expect(mockedStore.dispatch).toBeCalledTimes(1);
            expect(mockedStore.dispatch).toBeCalledWith({
                type: CrudModalActionTypeNames.ON_ROW_DATA_CHANGE,
                payload: { name: colModels[0].name, value: 'aa' },
                namespace
            });
        })
    })

    describe('edit mode', () => {
        beforeEach(function () {
            mockedStore.getState().crudModal.isInCreateMode = false;
        });
        describe('renders proper number of elements', () => {

            it('shoult render one => cm-colmenu-modal', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-crud-modal', () => renderComponent()))
            it('shoult render proper number of => cm-crud-modal-input-holder', () => {
                shouldRenderNumberOfTimesWithCssClass(colModels.length, 'cm-crud-modal-input-holder', () => renderComponent())
            })
        })

        it('should dispatch proper action on input change', () => {

            renderComponent()
            let input = document.body.querySelectorAll('.cm-crud-modal-text-input')[0];
            fireEvent.change(input, { target: { value: 'aa' } })
            expect(mockedStore.dispatch).toBeCalledTimes(1);
            expect(mockedStore.dispatch).toBeCalledWith({
                type: CrudModalActionTypeNames.ON_ROW_DATA_CHANGE,
                payload: { name: colModels[0].name, value: 'aa' },
                namespace
            });
        })
    })



    it('should dispatch close action on click on close btn', () => {
        renderComponent()
        let closeButton = document.body.querySelectorAll('.close')[0];
        fireEvent.click(closeButton)
        expect(mockedStore.dispatch).toBeCalledTimes(1);
        expect(mockedStore.dispatch).toBeCalledWith({
            type: CrudModalActionTypeNames.CLOSE_MODAL,
            payload: null,
            namespace
        });
    })
})

const renderComponent = () => {
    return render(
        <Provider store={mockedStore}>
            <CrudModal />
        </Provider>
    )
}


