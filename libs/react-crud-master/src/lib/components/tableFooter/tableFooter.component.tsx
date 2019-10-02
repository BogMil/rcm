import React, { Component, FormEvent, ChangeEvent } from "react";
import * as Redux from 'redux'

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

        if (this.props.tableWidth < 620)
            return <SmTableFooter tableWidth={this.props.tableWidth} />;

        return <LgTableFooter tableWidth={this.props.tableWidth} />
    };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.AnyAction>, ownProps: TableFooterOwnProps): TableFooterDispatchProps => {
    return {
        openCrudModalToCreate: () => null,
        openCrudModalToEdit: () => null,
        openWarningModal: () => null,
        openYesnoModal: () => null,
        openVModal: () => null
    };
}

const mapStateToProps = (state: AppState, props: TableFooterOwnProps): TableFooterStateProps => {
    return {
    } as TableFooterStateProps;
}

export default connect<TableFooterStateProps, TableFooterDispatchProps, TableFooterOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(TableFooterComponent);
