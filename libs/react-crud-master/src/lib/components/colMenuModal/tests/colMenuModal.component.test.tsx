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
import ColMenuModal from '../colMenuModal.component';
import { ReactCrudMasterActionTypeNames } from '../../reactCrudMaster/reactCrudMaster.types'
import { REACT_CRUD_MASTER } from '../../../actions/actionNamespaces';
import * as ReactCrudMasterActions from '../../reactCrudMaster/reactCrudMaster.actions'
import configureMockStore from 'redux-mock-store'
import { shouldRenderNumberOfTimesWithCssClass } from '../../../utils/testHelpers'
import { ColMenuModalActionTypeNames, ColMenuModalActionType } from '../colMenuModal.types'
import { COL_MENU_MODAL } from '../../../actions/actionNamespaces';



let colModels = TestData.colModels();
let data = TestData.data();
let store;
let mockedStore

beforeEach(() => {
    mockedStore = mockedStore = configureMockStore()({
        colMenuModal: {
            colModel: colModels[0],
            show: true
        }
    });
});

afterEach(cleanup)

describe('<ColMenuModal/>', () => {

    it('shoult render without problems', () => {
        mockedStore = mockedStore = configureMockStore()({
            colMenuModal: {
                colModel: colModels[0],
            }
        });
        renderComponent();
    })

    describe('renders proper number of elements', () => {

        it('shoult render 0 => cm-colmenu-modal', () => {
            mockedStore = mockedStore = configureMockStore()({
                colMenuModal: {
                    colModel: colModels[0],
                    show: false
                }
            });
            shouldRenderNumberOfTimesWithCssClass(0, 'cm-colmenu-modal', () => renderComponent())
        })

        it('shoult render one => cm-colmenu-modal', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-colmenu-modal', () => renderComponent()))
        it('shoult render one => cm-col-menu-modal-title', () => shouldRenderNumberOfTimesWithCssClass(1, 'cm-col-menu-modal-title', () => renderComponent()))
        it('shoult render one => modal close button with class : close', () => { shouldRenderNumberOfTimesWithCssClass(1, 'close', () => renderComponent()) })
    })

    describe('renders proper text content', () => {

        it('shoult render column name in title', () => {
            renderComponent()
            let x = document.querySelectorAll('.cm-col-menu-modal-title');
            expect(x[0].textContent.indexOf(colModels[0].name)).toBeGreaterThanOrEqual(0)
        })

        it('shoult dispatch close action on click on close btn', () => {
            mockedStore.dispatch = jest.fn();
            renderComponent()
            let closeButton = document.querySelectorAll('.close')[0];
            fireEvent.click(closeButton)
            expect(mockedStore.dispatch).toBeCalledTimes(1);
            expect(mockedStore.dispatch).toBeCalledWith({
                type: ColMenuModalActionTypeNames.CLOSE_MODAL,
                payload: null,
                namespace: COL_MENU_MODAL
            });
        })
    })

})

const renderComponent = () => {
    return render(
        <Provider store={mockedStore}>
            <ColMenuModal />
        </Provider>
    )
}


