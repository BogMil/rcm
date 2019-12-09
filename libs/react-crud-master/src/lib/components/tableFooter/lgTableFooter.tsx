import React, { Component } from "react";
import * as Redux from 'redux'
import {
    Form,
    Button,
    Col,
    Row,
    InputGroup
} from "react-bootstrap";

import '../reactCrudMaster/reactCrudMaster.css'

import { TableFooterOwnProps, TableFooterStateProps, TableFooterDispatchProps, TableFooterProps, TableFooterState } from "./tableFooter.types";
import { AppState } from "../../rootReducer";
import { connect, useDispatch, useSelector } from "react-redux";
import * as CurdModalActions from '../crudModal/crudModal.actions'
import * as ReactCrudMasterActions from '../reactCrudMaster/reactCrudMaster.actions'
import * as WarningModalActions from '../common/modals/warningModal/warningModal.actions'
import * as YesnoModalActions from '../common/modals/yesnoModal/yesnoModal.actions'
import * as VModalActions from '../vModal/vModal.actions'
import * as FontAwesomeClasses from '../../FontAwesomeClasses'
import './tableFooter.css'
import { UrlCreator } from '../../types/url';
import axios from 'axios'
import { Data } from '../reactCrudMaster/reactCrudMaster.types';
import { data } from '../../testData';

export default function LgTableFooterComponent() {
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

    const onClickOnNextPage = () => {
        dispatch(ReactCrudMasterActions.goToNextPage());
    }

    const onClickOnPreviousPage = () => {
        dispatch(ReactCrudMasterActions.goToPreviousPage());
    }
    const onClickOnLastPage = () => {
        dispatch(ReactCrudMasterActions.goToLastPage());
    }
    const onClickOnFirstPage = () => {
        dispatch(ReactCrudMasterActions.goToFirstPage());
    }
    return (
        <Row className="cm-table-footer cm-table-footer-lg">
            <Col xs={4} style={{ textAlign: "left" }}>
                <Button className="cm-add-btn cm-footer-button" size="sm" onClick={() => dispatch(CurdModalActions.openModalToCreate())}>
                    <i className={FontAwesomeClasses.add} />
                </Button>
                < Button size="sm" className="cm-edit-btn cm-footer-button" onClick={() => openCrudModalToEdit()}>
                    <i className={FontAwesomeClasses.edit} />
                </Button>
                < Button size="sm" className="cm-del-btn cm-footer-button" onClick={() => onClickOnDelete()}>
                    <i className={FontAwesomeClasses.del} />
                </Button>
                < Button size="sm" className="cm-view-btn cm-footer-button" onClick={() => onClickOnView()}>
                    <i className={FontAwesomeClasses.view} />
                </Button>
                < Button size="sm" className="cm-search-btn cm-footer-button">
                    <i className={FontAwesomeClasses.search} />
                </Button>
            </Col>
            < Col xs={4} >
                <InputGroup className="cm-pagination-holder" >
                    < Button size="sm" className="cm-footer-button cm-first-page-btn" onClick={() => onClickOnFirstPage()} disabled={store.data.currentPageNumber == 1}>
                        <i className={FontAwesomeClasses.firstPage} />
                    </Button>
                    < Button size="sm" className="cm-footer-button cm-previous-page-btn" onClick={() => onClickOnPreviousPage()} disabled={store.data.currentPageNumber == 1}>
                        <i className={FontAwesomeClasses.previousPage} />
                    </Button>
                    <div className="cm-page-number-input-holder">
                        <Form.Control className="cm-page-number-input" value={store.data.currentPageNumber ? store.data.currentPageNumber.toString() : ''} onChange={() => console.log("onChangeNotImplemented")} />
                    </div>
                    < Button size="sm" className="cm-footer-button cm-next-page-btn" onClick={() => onClickOnNextPage()} disabled={store.data.currentPageNumber == store.data.totalNumberOfPages}>
                        <i className={FontAwesomeClasses.nextPage} />
                    </Button>
                    < Button size="sm" className="cm-footer-button cm-last-page-btn" onClick={() => onClickOnLastPage()} disabled={store.data.currentPageNumber == store.data.totalNumberOfPages}>
                        <i className={FontAwesomeClasses.lastPage} />
                    </Button>
                </InputGroup>
            </Col>
            < Col xs={4} style={{ textAlign: "right" }}>
                {store.data.numOfRowsPerPage * (store.data.currentPageNumber - 1) + 1} - {store.data.numOfRowsPerPage * store.data.currentPageNumber} od {store.data.totalNumberOfRecords}
            </Col>
        </Row>
    );
}