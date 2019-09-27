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
import * as FontAwesomeClasses from '../../FontAwesomeClasses'

class ContextMenuModalComponent extends Component<ContextMenuModalProps, ContextMenuModalState>{

    render() {
        return (
            <div className="cm-context-menu-modal">
                <ContextMenuTrigger id={`context_menu_${this.props.RCMID}`} ref={c => this.props.setContextMenuTriggerRef(c)}>
                    <span></span>
                </ContextMenuTrigger>

                <ContextMenu id={`context_menu_${this.props.RCMID}`}>

                    <MenuItem>
                        <i className={FontAwesomeClasses.edit} /><span style={{ paddingLeft: 10 }}>Edit</span>
                    </MenuItem>
                    <MenuItem>
                        <i className={FontAwesomeClasses.del} /><span style={{ paddingLeft: 10 }}>Delete</span>
                    </MenuItem>
                    <MenuItem>
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
    };
}

const mapStateToProps = (state: AppState): ContextMenuModalStateProps => {
    return {
        RCMID: state.reactCrudMaster.RCMID
    } as ContextMenuModalStateProps;
}

export default connect<ContextMenuModalStateProps, ContextMenuModalDispatchProps, ContextMenuModalOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(ContextMenuModalComponent);
