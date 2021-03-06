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
import { ColumnTypeNames } from '../../constants/columnTypeNames';
import * as CrudService from '../../services/crudService'
import { UrlCreator, UrlCreatorFactory } from '../../types/url';
import * as CrudActions from '../../actions/crud'

export default function CrudModalComponent(props: CrudModalOwnProps) {
    const dispatch = useDispatch();
    const store = useSelector((state: AppState) => {
        return {
            ...state.crudModal,
            colModels: state.reactCrudMaster.colModels,
            RCMID: state.reactCrudMaster.RCMID,
            url: state.reactCrudMaster.url,
            data: state.reactCrudMaster.data
        }
    }) as CrudModalStateProps;

    const handleClose = () => {
        dispatch(CrudModalActions.closeModal());
    }

    const onRowDataChange = (name: string, value: any) => {
        let colModelMethods = props.colModelsMethods.filter(x => x.name == name)[0];
        let x = store.colModels.filter(s => s.name == name)[0];
        // colModelMethods.createMode.beforeChange();

        if (x.InputControl.inputType == 'BOOL')
            value = !store.rowData[name];

        dispatch(CrudModalActions.onRowDataChange(name, value))

        // colModelMethods.createMode.afterChange();
    };

    const save = async () => {
        let pk = store.colModels.find(s => s.columnType.name == ColumnTypeNames.PRIMARY_KEY)
        if (store.rowData[pk.name]) {
            update(store.url, store.rowData);
        } else {
            create(store.url, store.rowData);
        }
    };

    const create = (url, data) => {
        dispatch(CrudActions.create(url, data));
        dispatch(CrudModalActions.closeModal());
    }

    const update = (url, data) => {
        dispatch(CrudActions.update(url, data));
        dispatch(CrudModalActions.closeModal());
    }

    const onShow = () => {
        console.log(store.rowData)
    }

    return (
        < Modal style={{ borderRadius: 0 }}
            show={store.show}
            onHide={handleClose}
            centered
            className="cm-crud-modal"
            onShow={onShow}
        >
            <Modal.Header className="cm-crud-modal-header" >
                <Modal.Title as="h6">Add</Modal.Title>
                <button className="cm-crud-modal-footer-btn" style={{ backgroundColor: 'transparent', border: 0, marginRight: 8, position: 'absolute', right: 0 }} onClick={handleClose} >
                    <span style={{ color: 'rgb(90, 98, 104)' }} className="fa fa-times" aria-hidden="true"></span>
                </button>
            </Modal.Header>
            <Modal.Body className="cm-crud-modal-body">
                {
                    store.colModels.map((column, i) => {
                        if (column.name.indexOf('.') < 0)
                            // return column.InputControl.render(store.rowData, column, onRowDataChange);
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
            <Modal.Footer className="cm-crud-modal-footer">
                <Button className="cm-crud-modal-footer-btn" variant="secondary" onClick={handleClose} >
                    Close
                        </Button>
                < Button className="cm-crud-modal-footer-btn" variant="primary" onClick={save} >
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}