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
import VModal from '../vModal.component';
import { ReactCrudMasterActionTypeNames } from '../../reactCrudMaster/reactCrudMaster.types'
import { REACT_CRUD_MASTER } from '../../../actions/actionNamespaces';
import * as ReactCrudMasterActions from '../../reactCrudMaster/reactCrudMaster.actions'
import configureMockStore from 'redux-mock-store'
import { shouldRenderNumberOfTimesWithCssClass } from '../../../utils/testHelpers'
import { VModalActionTypeNames, VModalActionType } from '../vModal.types'
import { V_MODAL as namespace } from '../../../actions/actionNamespaces';



let colModels = TestData.colModels();
let data = TestData.data();
let mockedStore

beforeEach(() => {
    mockedStore = configureMockStore()({
        reactCrudMaster: {
            colModels,
            selectedRow: data[0]
        },
        vModal: {
            show: true
        }
    });

    mockedStore.dispatch = jest.fn();
});

afterEach(cleanup)

describe('<VModal/>', () => {


    it('shoult render without problems', () => {
        renderComponent();
    })

    it('shoult not render', () => {
        mockedStore.getState().vModal.show = false;
        renderComponent();
        let x = document.body.querySelectorAll('.cm-v-modal')
        expect(x.length).toBe(0);
    })

    describe('renders proper number of elements', () => {

        it('shoult render one => cm-v-modal', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-v-modal', () => renderComponent()))
        it('shoult render proper number of => cm-v-modal-cell-holder', () => {
            shouldRenderNumberOfTimesWithCssClass(colModels.length, 'cm-v-modal-cell-holder', () => renderComponent())
        })
    })

    it('should dispatch close action on click on close btn', () => {
        renderComponent()
        let closeButton = document.body.querySelectorAll('.close')[0];
        fireEvent.click(closeButton)
        expect(mockedStore.dispatch).toBeCalledTimes(1);
        expect(mockedStore.dispatch).toBeCalledWith({
            type: VModalActionTypeNames.CLOSE_MODAL,
            payload: null,
            namespace
        });
    })
})

const renderComponent = () => {
    return render(
        <Provider store={mockedStore}>
            <VModal />
        </Provider>
    )
}


