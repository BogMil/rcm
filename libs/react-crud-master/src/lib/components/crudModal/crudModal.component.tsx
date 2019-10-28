import React from "react";
import {
    Modal,
    Button,
} from "react-bootstrap";
import '../contexMenu.css';
import './crudModal.css';

import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../rootReducer'
import * as CrudModalActions from '../crudModal/crudModal.actions'
import { CrudModalOwnProps, CrudModalStateProps } from "./crudModal.types";
import InputControl from './inputControl/inputControl.component'

export default function CrudModalComponent(props: CrudModalOwnProps) {
    const dispatch = useDispatch();
    const store = useSelector((state: AppState) => {
        return {
            ...state.crudModal,
            colModels: state.reactCrudMaster.colModels,
            RCMID: state.reactCrudMaster.RCMID
        }
    }) as CrudModalStateProps;

    const handleClose = () => {
        dispatch(CrudModalActions.closeModal());
    }

    const onRowDataChange = (name: string, value: any) => {
        let colModelMethods = props.colModelsMethods.filter(x => x.name == name)[0];

        colModelMethods.createMode.beforeChange();

        if (colModelMethods.createModeInputControl.inputType == 'BOOL')
            value = !store.rowData[name];

        dispatch(CrudModalActions.onRowDataChange(name, value))

        colModelMethods.createMode.afterChange();
    };

    return (
        < Modal style={{ borderRadius: 0 }}
            show={store.show}
            onHide={handleClose}
            centered
            className="cm-crud-modal"
        >
            <Modal.Header className="cm-crud-modal-header" closeButton >
                <Modal.Title>Modal heading </Modal.Title>
            </Modal.Header>
            <Modal.Body className="cm-crud-modal-body">
                {
                    store.colModels.map((column, i) => {
                        return (
                            <InputControl
                                key={i}
                                column={column}
                                isInCreateMode={store.isInCreateMode}
                                rowData={store.rowData}
                                onRowDataChange={onRowDataChange}
                            />
                        )
                    })
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} >
                    Close
                        </Button>
                < Button variant="primary" onClick={handleClose} >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}