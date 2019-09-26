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

import update from 'immutability-helper'
import { TableFooterOwnProps, TableFooterStateProps, TableFooterDispatchProps, TableFooterProps, TableFooterState } from "./tableFooter.types";
import { AppState } from "../../rootReducer";
import { connect } from "react-redux";
import * as CurdModalActions from '../crudModal/crudModal.actions'
import SmTableFooter from './smTableFooter'
import LgTableFooter from './lgTableFooter';

class TableFooterComponent extends Component<TableFooterProps, TableFooterState>{
    constructor(props: TableFooterProps) {
        super(props);
        this.state = {};
    }


    render = () => {
        let buttonStyle = { borderRadius: 0, margin: 1 };

        if (this.props.tableWidth < 620)
            return <SmTableFooter tableWidth={this.props.tableWidth} />;

        return <LgTableFooter tableWidth={this.props.tableWidth} />
    };


}

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>, ownProps: TableFooterOwnProps): TableFooterDispatchProps => {
    return {
        openCrudModal: () => dispatch(CurdModalActions.openModal()),
    };
}

const mapStateToProps = (state: AppState, props: TableFooterOwnProps): TableFooterStateProps => {
    return {
    } as TableFooterStateProps;
}

export default connect<TableFooterStateProps, TableFooterDispatchProps, TableFooterOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(TableFooterComponent);

// export default Footer;
