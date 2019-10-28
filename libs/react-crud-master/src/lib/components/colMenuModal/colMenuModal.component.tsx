import React from "react";
import {
    Modal,
} from "react-bootstrap";
import '../contexMenu.css';
import '../reactCrudMaster/reactCrudMaster.css';

import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../rootReducer'
import { ColMenuModalStateProps } from "./colMenuModal.types";
import * as ColMenuModalActions from './colMenuModal.actions'

export default function ColMenuModalComponent() {
    const dispatch = useDispatch();
    const store = useSelector((state: AppState) => {
        return {
            colModel: state.colMenuModal.colModel,
            show: state.colMenuModal.show
        }
    }) as ColMenuModalStateProps;

    return (
        <Modal
            size="sm"
            centered
            show={store.show}
            onHide={() => dispatch(ColMenuModalActions.closeModal())}
            className="cm-colmenu-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className="cm-col-menu-modal-title">
                    {store.colModel && store.colModel.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>width: {store.colModel && store.colModel.width}</div>
                <div>freeze</div>
                <div>group</div>
                <div>advanced column filter</div>
            </Modal.Body>
        </Modal>
    );

}
