import React, { Component } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";

import { connect, useDispatch, useSelector } from 'react-redux'
import * as Redux from 'redux'
import { AppState } from '../../../../rootReducer'
import * as WarningModalActions from '../warningModal/warningModal.actions'
import { WarningModalOwnProps, WarningModalDispatchProps, WarningModalStateProps, WarningModalState, WarningModalProps, initialState } from "./warningModal.types";
import '../common.css'
import './warningModal.css'

export default function WarningModalComponent() {
    const dispatch = useDispatch();
    const store = useSelector((state: AppState) => {
        return {
            show: state.warningModal.show,
            message: state.warningModal.message
        }
    }) as WarningModalStateProps;

    return (
        < Modal
            show={store.show}
            onHide={() => dispatch(WarningModalActions.closeModal())}
            centered
            className="cm-warning-modal cm-common-modal"
            size="sm"
        >
            <Modal.Header className="cm-common-modal-header cm-warning-modal-header" closeButton>
                <Modal.Title>Warning </Modal.Title>
            </Modal.Header>
            <Modal.Body className="cm-common-modal-body" >
                {store.message}
            </Modal.Body>
        </Modal>
    );
}