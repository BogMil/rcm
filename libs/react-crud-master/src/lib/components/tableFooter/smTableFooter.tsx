import React, { Component, FormEvent, ChangeEvent } from "react";
import * as Redux from 'redux'
import {
    Table,
    Card,
    Modal,
    Navbar,
    NavDropdown,
    Nav,
    Form,
    FormControl,
    Button,
    Dropdown,
    Col,
    Row,
    InputGroup
} from "react-bootstrap";

import '../reactCrudMaster/reactCrudMaster.css'

import { TableFooterOwnProps, TableFooterStateProps, TableFooterDispatchProps, TableFooterProps, TableFooterState } from "./tableFooter.types";
import { AppState } from "../../rootReducer";
import { connect, useDispatch, useSelector } from "react-redux";

import * as CurdModalActions from '../crudModal/crudModal.actions'
import * as WarningModalActions from '../common/modals/warningModal/warningModal.actions'
import * as YesnoModalActions from '../common/modals/yesnoModal/yesnoModal.actions'
import * as VModalActions from '../vModal/vModal.actions'

import * as FontAwesomeClasses from '../../FontAwesomeClasses'

export default function SmTableFooterComponent() {
    const dispatch = useDispatch();
    const store = useSelector((state: AppState) => { return { ...state.reactCrudMaster } }) as TableFooterStateProps;
    const openCrudModalToEdit = () => {
        if (!store.selectedRow) {
            dispatch(WarningModalActions.openModal('Select row first'));
            return;
        }
        dispatch(dispatch(CurdModalActions.openModalToEdit(store.selectedRow)));
    }

    const onClickOnDelete = () => {
        if (!store.selectedRow) {
            dispatch(WarningModalActions.openModal('Select row first'));
            return;
        }

        dispatch(YesnoModalActions.openModal('title', 'areYouSure', () => console.log("deleted")));
    }

    const onClickOnView = () => {
        if (!store.selectedRow) {
            dispatch(WarningModalActions.openModal('Select row first'));
            return;
        }

        dispatch(VModalActions.openModal());
    }

    return (

        <Row className="cm-table-footer cm-table-footer-xs">
            <Col xs={2} >
                <Dropdown style={{ textAlign: "left" }}>
                    <Dropdown.Toggle className="cm-crud-menu-button cm-footer-button" size="sm" variant="primary" id="dropdown-basic">
                        <i className="fas fa-bars"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item className="cm-add-btn" onClick={() => dispatch(CurdModalActions.openModalToCreate())}>
                            <i className={FontAwesomeClasses.add} /><span className="cm-padding-left-10">Add</span>
                        </Dropdown.Item>
                        < Dropdown.Item className="cm-edit-btn" onClick={() => openCrudModalToEdit()}>
                            <i className={FontAwesomeClasses.edit} /><span className="cm-padding-left-10">Edit</span>
                        </Dropdown.Item>
                        < Dropdown.Item className="cm-del-btn" onClick={() => onClickOnDelete()}>
                            <i className={FontAwesomeClasses.del} /><span className="cm-padding-left-10">Delete</span>
                        </Dropdown.Item>
                        < Dropdown.Item className="cm-view-btn" onClick={() => onClickOnView()}>
                            <i className={FontAwesomeClasses.view} /> <span className="cm-padding-left-10">View</span>
                        </Dropdown.Item>
                        < Dropdown.Item >
                            <i className={FontAwesomeClasses.search} /> <span className="cm-padding-left-10">Search</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            < Col xs={6} >
                <InputGroup className="cm-pagination-holder">
                    < Button size="sm" className="cm-footer-button cm-previous-page-btn">
                        <i className={FontAwesomeClasses.previousPage}></i>
                    </Button>
                    <div className="cm-page-number-input-holder">
                        <Form.Control className="cm-page-number-input" defaultValue="" />
                    </div>
                    < Button size="sm" className="cm-footer-button cm-next-page-btn">
                        <i className={FontAwesomeClasses.nextPage}></i>
                    </Button>
                </InputGroup>
            </Col>
            <Col xs={4} > 102 - 103 / 123 </Col>
        </Row>
    );

}