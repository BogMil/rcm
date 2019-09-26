import React, { Component } from "react";
import {
    Table,
} from "react-bootstrap";
import '../contexMenu.css';
import '../reactCrudMaster/reactCrudMaster.css';

import { connect } from 'react-redux'
import { AppState } from '../../rootReducer'
import { TableBodyProps, TableBodyState, initialState, TableBodyOwnProps, TableBodyDispatchProps, TableBodyStateProps } from "./tableBody.types";
import * as ReactableActions from '../reactCrudMaster/reactCrudMaster.actions'
import { ThunkDispatch } from "redux-thunk";

class TableBodyComponent extends Component<TableBodyProps, TableBodyState>{
    constructor(props: TableBodyProps) {
        super(props);
        this.state = initialState();
    }

    onClickOnRow = (row: any) => {
        this.props.selectRow(row);
    };

    onRightClickOnRow = (e: any, row: any) => {
        e.preventDefault();
        this.openContextMenu(e);
        this.onClickOnRow(row);
    }

    openContextMenu = (e: any) => {
        // if (this.props.contextTrigger != null)
        this.props.contextTrigger.handleContextClick(e);
    };

    testScroll = (e: any) => {
        var x = document.getElementById(`cm-table-header-holder-${this.props.RCMID}`);
        x!.scrollLeft = e.target.scrollLeft

        var z = document.getElementsByClassName('react-contextmenu--visible') as HTMLCollectionOf<HTMLElement>;
        if (z.length > 0)
            for (var i = 0; i < z.length; i++) {
                (z.item(i))!.style.opacity = "0";
                (z.item(i))!.style.pointerEvents = "none";
                (z.item(i))!.classList.remove('react-contextmenu--visible');
            }
    }

    render() {
        return (
            <div id={`cm-data-table-holder-${this.props.RCMID}`} className="cm-data-table-holder" onScroll={(e: any) => this.testScroll(e)}>
                <Table className="cm-data-table" striped bordered hover size="sm"
                    style={{
                        width: this.props.tableWidth,
                        //20 moz
                        //7 chrome
                    }}>
                    <tbody className="cm-data-table-tbody">
                        {
                            this.props.data.map((dataRow, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={dataRow == this.props.selectedRow ? "cm-selected-row cm-data-row" : "cm-data-row"}
                                        onClick={() => this.onClickOnRow(dataRow)}
                                        onContextMenu={(e: any) => this.onRightClickOnRow(e, dataRow)}
                                    >
                                        {
                                            this.props.colModels.map((colModel, index) => {
                                                return <td key={index} className="cm-data-cell" style={{ width: colModel.width }}> {dataRow[colModel.name]} </td>;
                                            })
                                        }
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table >
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): TableBodyDispatchProps => {
    return {
        selectRow: (row: any) => dispatch(ReactableActions.selectRow(row))
    };
}

const mapStateToProps = (state: AppState): TableBodyStateProps => {
    return {
        colModels: state.reactCrudMaster.colModels,
        data: state.reactCrudMaster.data,
        tableWidth: state.reactCrudMaster.tableWidth,
        RCMID: state.reactCrudMaster.RCMID,
        width: state.reactCrudMaster.width,
        selectedRow: state.reactCrudMaster.selectedRow,
        contextTrigger: state.contextMenuModal.contextMenuTrigger
    } as TableBodyStateProps;
}

export default connect<TableBodyStateProps, TableBodyDispatchProps, TableBodyOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(TableBodyComponent);
