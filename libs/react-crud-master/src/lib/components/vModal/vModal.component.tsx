import React from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import '../contexMenu.css';

import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../rootReducer'
import * as VModalActions from '../vModal/vModal.actions'
import { VModalStateProps } from "./vModal.types";
import './vmodal.css'

export default function VModalComponent() {
    const dispatch = useDispatch();
    const store = useSelector((state: AppState) => {
        return {
            show: state.vModal.show,
            colModels: state.reactCrudMaster.colModels,
            rowData: state.reactCrudMaster.selectedRow,
        }
    }) as VModalStateProps;

    const handleClose = () => {
        dispatch(VModalActions.closeModal());
    }

    return (
        < Modal style={{ borderRadius: 0 }}
            show={store.show}
            onHide={handleClose}
            centered
            className="cm-v-modal"
        >
            <Modal.Header className="cm-v-modal-header" closeButton >
                <Modal.Title>Modal heading </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {store.rowData &&
                    store.colModels.map((column) => {
                        return (
                            <div key={column.name} className="cm-v-modal-cell-holder">
                                <Form.Group style={{ marginBottom: 5 }}>
                                    <Form.Label style={{ marginBottom: 0 }} >
                                        {column.name}
                                    </Form.Label>
                                    <div className="cm-v-modal-cell-value-holder">
                                        {store.rowData[column.name]}
                                    </div>
                                </Form.Group>
                            </div>
                        );
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} >
                    Close
                    </Button>
            </Modal.Footer>
        </Modal>
    );
}