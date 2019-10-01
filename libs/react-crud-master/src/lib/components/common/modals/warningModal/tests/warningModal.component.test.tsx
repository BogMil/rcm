import React from "react";

import {
    render,
    cleanup,
    fireEvent
} from '@testing-library/react';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../../../../../rootReducer";
import thunk from "redux-thunk";
import * as TestData from '../../../../../testData'
import WarningModal from '../warningModal.component';
import configureMockStore from 'redux-mock-store'
import { shouldRenderNumberOfTimesWithCssClass } from '../../../../../utils/testHelpers'
import { WarningModalActionTypeNames, WarningModalActionType } from '../warningModal.types'
import { WARNING_MODAL as namespace } from '../../../../../actions/actionNamespaces';

let mockedStore

beforeEach(() => {
    mockedStore = configureMockStore()({
        warningModal: {
            show: true,
            message: ''
        }
    });

    mockedStore.dispatch = jest.fn();
});

afterEach(cleanup)

describe('<WarningModal/>', () => {


    it('shoult render without problems', () => {
        renderComponent();
    })

    it('shoult not render', () => {
        mockedStore.getState().warningModal.show = false;
        renderComponent();
        let x = document.body.querySelectorAll('.cm-warning-modal')
        expect(x.length).toBe(0);
    })

    describe('create mode', () => {
        describe('renders proper number of elements', () => {

            it('shoult render one => cm-warning-modal', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-warning-modal', () => renderComponent()))
        })

        it('should dispatch proper action on input change', () => {

            renderComponent()
            let input = document.body.querySelectorAll('.close')[0];
            fireEvent.click(input)
            expect(mockedStore.dispatch).toBeCalledTimes(1);
            expect(mockedStore.dispatch).toBeCalledWith({
                type: WarningModalActionTypeNames.CLOSE_MODAL,
                payload: null,
                namespace
            });
        })
    })
})

const renderComponent = () => {
    return render(
        <Provider store={mockedStore}>
            <WarningModal />
        </Provider>
    )
}


