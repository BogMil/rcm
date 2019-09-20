import React, { Component } from "react";
import {
    Card, Row, Col
} from "react-bootstrap";
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import '../contexMenu.css';
import './reactCrudMaster.css';

import TableFooter from "../tableFooter/tableFooter.component"
import { connect } from 'react-redux'
import { ReactCrudMasterProps, ReactCrudMasterState, initialState, ReactCrudMasterStateProps, ReactCrudMasterDispatchProps, ReactCrudMasterOwnProps } from "./reactCrudMaster.types";
import { ColModel } from "../../types/colModel";
import { AppState } from '../../rootReducer'
import * as ReactCrudMasterActions from './reactCrudMaster.actions'
import TableHeader from '../tableHeader/tableHeader.component'
import TableBody from '../tableBody/tableBody.component'
import CrudModal from '../crudModal/crudModal.component'
import ColMenuModal from '../colMenuModal/colMenuModal.component'
import ContextMenuModal from '../contextMenuModal/contextMenuModal.component'
import * as TextSelection from '../../utils/textSelection'

import { ThunkDispatch } from "redux-thunk";

class ReactCrudMasterComponent extends Component<ReactCrudMasterProps, ReactCrudMasterState>{
    constructor(props: ReactCrudMasterProps) {
        super(props);
        this.state = initialState();
    }

    componentDidMount = () => {

        this.props.setColModels(this.props.colModelsProp);
        this.props.setData(this.props.dataProp);
        this.props.resetTableoffsetWidth();

        if(this.props.tableTitle != null)
            this.props.setTableTitle(this.props.tableTitle);        

        this.onMouseUp();
        this.onMouseMove();

        window.addEventListener("resize", this.props.resetTableoffsetWidth);
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.props.resetTableoffsetWidth);
    };

    onMouseMove=()=>{
        document.getElementById(`CMID-${this.props.RCMID}`)!.addEventListener("mousemove", (e: MouseEvent) => {
            if (this.props.columnToResize != null) {
                this.props.resizeColumn(e);
            }
        });
    }

    onMouseUp=()=>{
        document.getElementById(`CMID-${this.props.RCMID}`)!.addEventListener("mouseup", () => {
            if (this.props.columnToResize == null)
                return;

            this.props.setColumnToResize();
            TextSelection.enableTextSelectionOnPage();
        });
    }

    render() {

        return (
            <>
                <Card className='react-crud-master' id={`CMID-${this.props.RCMID}`}>
                    <Card.Header className='cm-table-header' as="h5" >{this.props.tableTitleProp}</Card.Header>
                    <Card.Body className='cm-table-body'>
                        <div id={`reactable-card-body-${this.props.RCMID}`} className="cm-data-table-holder">
                            <TableHeader />
                            <TableBody />
                        </div>

                        <div className='cm-table-footer-holder' >
                            <TableFooter tableWidth={this.props.width} />
                        </div>
                    </Card.Body>

                </Card>

                <CrudModal/>
                <ColMenuModal />
                <ContextMenuModal />
            </>
        );
    }


}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): ReactCrudMasterDispatchProps => {
    return {
        setColModels: (colModels: ColModel[]) => dispatch(ReactCrudMasterActions.setColModels(colModels)),
        setData: (data: any[]) => dispatch(ReactCrudMasterActions.setData(data)),
        resizeColumn: (e: MouseEvent) => dispatch(ReactCrudMasterActions.resizeColumn(e)),
        setColumnToResize: (column: (ColModel | null) = null, startOffset: (number | null) = null) => dispatch(ReactCrudMasterActions.setColumnToResize(column, startOffset)),
        resetTableoffsetWidth: () => dispatch(ReactCrudMasterActions.resetTableoffsetWidth()),
        setTableTitle: (tableTitle:string) => dispatch(ReactCrudMasterActions.setTableTitle(tableTitle)),
    };
}

const mapStateToProps = (state: AppState): ReactCrudMasterStateProps => {
    return {
        columnToResize: state.reactCrudMaster.columnToResize,
        RCMID: state.reactCrudMaster.RCMID,
        width: state.reactCrudMaster.width,
        tableTitleProp:state.reactCrudMaster.tableTitleProp
    } as ReactCrudMasterStateProps;
}

export default connect<
    ReactCrudMasterStateProps,
    ReactCrudMasterDispatchProps,
    ReactCrudMasterOwnProps,
    AppState
>(mapStateToProps, mapDispatchToProps)(ReactCrudMasterComponent);
