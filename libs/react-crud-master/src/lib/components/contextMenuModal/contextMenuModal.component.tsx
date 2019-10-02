import React, { Component } from "react";
import {
    Table,
} from "react-bootstrap";
import '../contexMenu.css';
import '../reactCrudMaster/reactCrudMaster.css';

import { connect } from 'react-redux'
import { AppState } from '../../rootReducer'
import { ContextMenuModalProps, ContextMenuModalState, initialState, ContextMenuModalOwnProps, ContextMenuModalDispatchProps, ContextMenuModalStateProps } from "./ContextMenuModal.types";
import * as ContextMenuActions from './contextMenuModal.actions'
import * as CurdModalActions from '../crudModal/crudModal.actions'

import { ThunkDispatch } from "redux-thunk";
import { ContextMenuTrigger, ContextMenu, MenuItem } from "react-contextmenu";
import * as FontAwesomeClasses from '../../FontAwesomeClasses'
import * as WarningModalActions from '../common/modals/warningModal/warningModal.actions'
import * as YesnoModalActions from '../common/modals/yesnoModal/yesnoModal.actions'
import * as VModalActions from '../vModal/vModal.actions'

class ContextMenuModalComponent extends Component<ContextMenuModalProps, ContextMenuModalState>{

    openCrudModalToEdit = () => {
        if (!this.props.selectedRow) {
            this.props.openWarningModal('Select row first');
            return;
        }

        this.props.openCrudModalToEdit(this.props.selectedRow)
    }

    onClickOnDelete = () => {
        if (!this.props.selectedRow) {
            this.props.openWarningModal('Select row first');
            return;
        }

        this.props.openYesnoModal('title', 'areYouSure', () => console.log("deleted"));
    }

    onClickOnView = () => {
        if (!this.props.selectedRow) {
            this.props.openWarningModal('Select row first');
            return;
        }

        this.props.openVModal();
    }

    render() {
        return (
            <div className="cm-context-menu-modal">
                <ContextMenuTrigger id={`context_menu_${this.props.RCMID}`} ref={c => this.props.setContextMenuTriggerRef(c)}>
                    <span></span>
                </ContextMenuTrigger>

                <ContextMenu id={`context_menu_${this.props.RCMID}`}>

                    <MenuItem onClick={() => this.openCrudModalToEdit()}>
                        <i className={FontAwesomeClasses.edit} /><span style={{ paddingLeft: 10 }}>Edit</span>
                    </MenuItem>
                    <MenuItem onClick={() => this.onClickOnDelete()}>
                        <i className={FontAwesomeClasses.del} /><span style={{ paddingLeft: 10 }}>Delete</span>
                    </MenuItem>
                    <MenuItem onClick={() => this.onClickOnView()}>
                        <i className={FontAwesomeClasses.view} /> <span style={{ paddingLeft: 10 }}>View</span>
                    </MenuItem>
                </ContextMenu>
            </div>
        );
    }
}




const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): ContextMenuModalDispatchProps => {
    return {
        setContextMenuTriggerRef: (c: any) => dispatch(ContextMenuActions.setContextMenuTriggerRef(c)),
        openCrudModalToEdit: (rowData) => dispatch(CurdModalActions.openModalToEdit(rowData)),
        openWarningModal: (message) => dispatch(WarningModalActions.openModal(message)),
        openYesnoModal: (question, title, onConfirm, onDeny) => dispatch(YesnoModalActions.openModal(question, title, onConfirm, onDeny)),
        openVModal: () => dispatch(VModalActions.openModal())
    };
}

const mapStateToProps = (state: AppState): ContextMenuModalStateProps => {
    return {
        RCMID: state.reactCrudMaster.RCMID,
        selectedRow: state.reactCrudMaster.selectedRow
    } as ContextMenuModalStateProps;
}

export default connect<ContextMenuModalStateProps, ContextMenuModalDispatchProps, ContextMenuModalOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(ContextMenuModalComponent);
