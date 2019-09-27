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
import ContextMenuModal from '../ContextMenuModal.component';
import { ReactCrudMasterActionTypeNames } from '../../reactCrudMaster/reactCrudMaster.types'
import { REACT_CRUD_MASTER } from '../../../actions/actionNamespaces';
import * as ReactCrudMasterActions from '../../reactCrudMaster/reactCrudMaster.actions'
import configureMockStore from 'redux-mock-store'
import { shouldRenderNumberOfTimesWithCssClass } from '../../../utils/testHelpers'
import { ContextMenuModalActionTypeNames, ContextMenuModalActionType } from '../ContextMenuModal.types'
import { COL_MENU_MODAL } from '../../../actions/actionNamespaces';



let colModels = TestData.colModels();
let data = TestData.data();
let store;
let mockedStore
let RCMID = Date.now()
beforeEach(() => {
    mockedStore = mockedStore = configureMockStore()({
        reactCrudMaster: {
            RCMID: RCMID,
        }
    });

    mockedStore.dispatch = jest.fn();
});

afterEach(cleanup)

describe('<ContextMenuModal/>', () => {

    it('shoult render without problems', () => {
        renderComponent();
    })

    describe('renders proper number of elements', () => {

        it('shoult render one => cm-context-menu-modal', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-context-menu-modal', () => renderComponent()))
    })

    describe('on mount', () => {
        it('should dispatch proper actions', () => {
            renderComponent();
            expect(mockedStore.dispatch).toBeCalledTimes(1);
        })
    })

})

const renderComponent = () => {
    return render(
        <Provider store={mockedStore}>
            <ContextMenuModal />
        </Provider>
    )
}


