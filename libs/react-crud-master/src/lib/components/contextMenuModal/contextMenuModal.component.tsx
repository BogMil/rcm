import React, { Component, useRef, useEffect } from "react";
import {
    Table,
} from "react-bootstrap";
import '../contexMenu.css';
import '../reactCrudMaster/reactCrudMaster.css';

import { connect, useSelector, useDispatch } from 'react-redux'
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

export default function ContextMenuModal() {
    const dispatch = useDispatch();
    const store = useSelector((state: AppState) => {
        return {
            RCMID: state.reactCrudMaster.RCMID,
            selectedRow: state.reactCrudMaster.selectedRow
        }
    }) as ContextMenuModalStateProps;

    const openCrudModalToEdit = () => {
        if (!store.selectedRow) {
            dispatch(WarningModalActions.openModal('Select row first'));
            return;
        }
        dispatch(CurdModalActions.openModalToEdit(store.selectedRow));
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


    const contextMenuTriggerRef = useRef();
    const setRef = ref => contextMenuTriggerRef.current = ref;

    useEffect(() => {
        dispatch(ContextMenuActions.setContextMenuTriggerRef(contextMenuTriggerRef.current));
    }, [contextMenuTriggerRef]);

    return (
        <div className="cm-context-menu-modal">
            <ContextMenuTrigger id={`context_menu_${store.RCMID}`} ref={c => setRef(c)}>
                <span></span>
            </ContextMenuTrigger>

            <ContextMenu id={`context_menu_${store.RCMID}`}>

                <MenuItem onClick={() => openCrudModalToEdit()}>
                    <i className={FontAwesomeClasses.edit} /><span style={{ paddingLeft: 10 }}>Edit</span>
                </MenuItem>
                <MenuItem onClick={() => onClickOnDelete()}>
                    <i className={FontAwesomeClasses.del} /><span style={{ paddingLeft: 10 }}>Delete</span>
                </MenuItem>
                <MenuItem onClick={() => onClickOnView()}>
                    <i className={FontAwesomeClasses.view} /> <span style={{ paddingLeft: 10 }}>View</span>
                </MenuItem>
            </ContextMenu>
        </div>
    );
}