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
import YesnoModal from '../yesnoModal.component';
import configureMockStore from 'redux-mock-store'
import { shouldRenderNumberOfTimesWithCssClass } from '../../../../../utils/testHelpers'
import { YesnoModalActionTypeNames, YesnoModalActionType } from '../yesnoModal.types'
import { WARNING_MODAL as namespace } from '../../../../../actions/actionNamespaces';

let mockedStore

beforeEach(() => {
    mockedStore = configureMockStore()({
        yesnoModal: {
            show: true,
            message: ''
        }
    });

    mockedStore.dispatch = jest.fn();
});

afterEach(cleanup)

describe('<YesnoModal/>', () => {


    it('shoult render without problems', () => {
        renderComponent();
    })

    it('shoult not render', () => {
        mockedStore.getState().yesnoModal.show = false;
        renderComponent();
        let x = document.body.querySelectorAll('.cm-yesno-modal')
        expect(x.length).toBe(0);
    })

    describe('renders proper number of elements', () => {

        it('shoult render one => cm-yesno-modal', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-yesno-modal', () => renderComponent()))
    })
})

const renderComponent = () => {
    return render(
        <Provider store={mockedStore}>
            <YesnoModal />
        </Provider>
    )
}


