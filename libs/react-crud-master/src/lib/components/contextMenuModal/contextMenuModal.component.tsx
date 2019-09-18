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
import { ThunkDispatch } from "redux-thunk";
import { ContextMenuTrigger, ContextMenu, MenuItem } from "react-contextmenu";

class ContextMenuModalComponent extends Component<ContextMenuModalProps, ContextMenuModalState>{

    render() {
        return (
            <>
                <ContextMenuTrigger id={`context_menu_${this.props.RCMID}`} ref={c => this.props.setContextMenuTriggerRef(c)}>
                    <span></span>
                </ContextMenuTrigger>

                <ContextMenu id={`context_menu_${this.props.RCMID}`}>

                    <MenuItem>
                        <i className="fas fa-edit" /><span style={{ paddingLeft: 10 }}>Edit</span>
                    </MenuItem>
                    <MenuItem>
                        <i className="fas fa-trash-alt" /><span style={{ paddingLeft: 10 }}>Delete</span>
                    </MenuItem>
                    <MenuItem>
                        <i className="fas fa-eye" /> <span style={{ paddingLeft: 10 }}>View</span>
                    </MenuItem>
                </ContextMenu>
            </>
        );
    }
}




const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): ContextMenuModalDispatchProps => {
    return {
        setContextMenuTriggerRef:(c:any)=>dispatch(ContextMenuActions.setContextMenuTriggerRef(c)),
    };
}

const mapStateToProps = (state: AppState): ContextMenuModalStateProps => {
    return {
        // contextMenuTrigger:state.contextMenuModal.contextMenuTrigger,
        RCMID:state.reactCrudMaster.RCMID
    } as ContextMenuModalStateProps;
}

export default connect<ContextMenuModalStateProps, ContextMenuModalDispatchProps, ContextMenuModalOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(ContextMenuModalComponent);
