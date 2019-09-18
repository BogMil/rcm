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

        document.getElementById(`CMID-${this.props.RCMID}`)!.addEventListener("mouseup", () => {
            this.disableResizingColumnIfInResizeMode()
        });

        document.getElementById(`CMID-${this.props.RCMID}`)!.addEventListener("mousemove", (e: MouseEvent) => {
            this.resizeColumnIfInResizeMode(e);
        });
    };

    componentWillMount = () => {
        window.addEventListener("resize", this.handleWindowSizeChange);
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.handleWindowSizeChange);
    };

    handleWindowSizeChange = () => {
        this.props.resetTableoffsetWidth();
    };

    disableResizingColumnIfInResizeMode = () => {
        if (this.props.columnToResize == null)
            return;

        this.props.setColumnToResize();
        this.enableTextSelectionOnPage();
    }

    resizeColumnIfInResizeMode = (e: MouseEvent) => {
        if (this.props.columnToResize != null) {
            this.props.resizeColumn(e);
        }
    }

    enableTextSelectionOnPage = () => {
        document.body.style.webkitUserSelect = "";
        document.body.style.msUserSelect = "";
        document.body.style.userSelect = "";
    }

    render() {

        return (
            <>
                <Card id={`CMID-${this.props.RCMID}`}
                    style={{ minWidth: 360, borderRadius: 0 }}
                >
                    <Card.Header className='cm-table-header' data-testid='cm-table-header' style={{ padding: 5 }} as="h5" >{this.props.tableTitleProp}</Card.Header>
                    <Card.Body style={{ padding: 0 }}>
                        <div id={`reactable-card-body-${this.props.RCMID}`} className="reactable-table-holder">
                            <TableHeader />
                            <TableBody />
                        </div>

                        <div style={{ paddingRight: 20, paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>
                            <TableFooter tableWidth={this.props.width} />
                        </div>
                    </Card.Body>

                </Card>

                <CrudModal />
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
        setColumnToResize: (column: (ColModel | null) = null, e: (any | null) = null) => dispatch(ReactCrudMasterActions.setColumnToResize(column, e)),
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
