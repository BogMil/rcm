import React, { Component, useEffect } from "react";
import {
    Card, Row, Col
} from "react-bootstrap";
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
// import '../contexMenu.css';
import './reactCrudMaster.css';

import TableFooter from "../tableFooter/tableFooter.component"
import { connect, useDispatch, useSelector } from 'react-redux'
import { ReactCrudMasterProps, ReactCrudMasterState, initialState, ReactCrudMasterStateProps, ReactCrudMasterDispatchProps, ReactCrudMasterOwnProps } from "./reactCrudMaster.types";
import { ColModel, ColModelMethodsExtractor } from "../../types/colModel";
import { AppState } from '../../rootReducer'
import * as Actions from './reactCrudMaster.actions'
import TableHeader from '../tableHeader/tableHeader.component'
import TableBody from '../tableBody/tableBody.component'
import CrudModal from '../crudModal/crudModal.component'
import VModal from '../vModal/vModal.component'
import ColMenuModal from '../colMenuModal/colMenuModal.component'
import ContextMenuModal from '../contextMenuModal/contextMenuModal.component'
import * as TextSelection from '../../utils/textSelection'
import WarningModal from '../common/modals/warningModal/warningModal.component'
import YesnoModal from '../common/modals/yesnoModal/yesnoModal.component'
import axios from 'axios';

import { ThunkDispatch } from "redux-thunk";

export default function ReactCrudMasterComponent(props: ReactCrudMasterOwnProps) {
    const dispatch = useDispatch();
    const store = useSelector((state: AppState) => state.reactCrudMaster) as ReactCrudMasterStateProps;

    useEffect(() => {
        dispatch(Actions.setColModels(props.colModelsProp))

        if (props.urlProp) {
            axios({
                method: 'get',
                url: props.urlProp
            }).then((res) => {
                dispatch(Actions.setData(res.data.records));
            });
        } else if (props.dataProp) {
            dispatch(Actions.setData(props.dataProp));
        }

        dispatch(Actions.resetTableoffsetWidth());

        if (props.tableTitle != null)
            dispatch(Actions.setTableTitle(props.tableTitle))
        else
            dispatch(Actions.setTableTitle('Table title'));

        window.addEventListener("resize", () => dispatch(Actions.resetTableoffsetWidth()));

        return () => {
            window.removeEventListener("resize", () => dispatch(Actions.resetTableoffsetWidth()));
        }
    }, []);

    useEffect(() => {
        document.getElementById(`CMID-${store.RCMID}`)!.addEventListener("mousemove", onMouseMove);
        document.getElementById(`CMID-${store.RCMID}`)!.addEventListener("mouseup", onMouseUp);
        window.addEventListener("resize", () => dispatch(Actions.resetTableoffsetWidth()));
        return () => {
            document.getElementById(`CMID-${store.RCMID}`)!.removeEventListener("mousemove", onMouseMove);
            document.getElementById(`CMID-${store.RCMID}`)!.removeEventListener("mouseup", onMouseUp);
        };
    }, [store.columnToResize]);

    function onMouseMove(e: MouseEvent) {

        if (store.columnToResize != null) {
            document.body.style.cursor = 'col-resize'
            dispatch(Actions.resizeColumn(e));
        }
    }
    function onMouseUp() {
        if (store.columnToResize == null)
            return;

        dispatch(Actions.setColumnToResize(null, null))
        TextSelection.enableTextSelectionOnPage();
        document.body.style.cursor = ''
    }

    let colModelsMethods = props.colModelsProp.map(colModel => {
        return ColModelMethodsExtractor.extractFromColModel(colModel);
    })
    return (
        <>
            <Card className='react-crud-master' id={`CMID-${store.RCMID}`}>
                <Card.Header className='cm-table-header' as="h5" >{store.tableTitleProp}</Card.Header>
                <Card.Body className='cm-table-body'>
                    <div id={`reactable-card-body-${store.RCMID}`} className="cm-table-header-and-table-body-holder">
                        <TableHeader />
                        <TableBody />
                    </div>

                    <div className='cm-table-footer-holder' >
                        <TableFooter tableWidth={store.width} />
                    </div>
                </Card.Body>
            </Card>

            <CrudModal colModelsMethods={colModelsMethods} />
            <VModal />

            <ColMenuModal />
            <ContextMenuModal />

            <WarningModal />
            <YesnoModal />
        </>
    )
}