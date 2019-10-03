import React, { Component, FormEvent, ChangeEvent, useState, useCallback } from "react";
import {
    Table,
    Modal,
    Button,
} from "react-bootstrap";
import '../contexMenu.css';
import '../reactCrudMaster/reactCrudMaster.css';

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import * as Redux from 'redux'
import { ColModel } from "../../types/colModel";
import { rootReducer, AppState } from '../../rootReducer'
import { any } from "prop-types";
import { TableHeaderProps, TableHeaderState, initialState, TableHeaderOwnProps, TableHeaderDispatchProps, TableHeaderStateProps } from "./tableHeader.types";
import * as ReactCrudMasterActions from '../reactCrudMaster/reactCrudMaster.actions'
import * as ColMenuModelActions from '../colMenuModal/colMenuModal.actions'
import { ThunkDispatch } from "redux-thunk";
import './tableHeader.css'
import * as TextSelection from '../../utils/textSelection'
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import DraggableColumnHeader from './draggableColumnHeader';

class TableHeaderComponent extends Component<TableHeaderProps, TableHeaderState>{
    constructor(props: TableHeaderProps) {
        super(props);
        this.state = initialState();
    }

    componentDidMount = () => {

    };

    render() {
        return (
            <div className='cm-table-header-holder' id={`cm-table-header-holder-${this.props.RCMID}`} onScroll={this.onHorizontalScroll}>
                <Table className="cm-header-table" striped bordered hover size="sm"
                    style={{ width: this.props.tableWidth }}
                >
                    <thead className='cm-header-table-thead'>
                        <tr>
                            {this.props.colModels.map((column) => {
                                return (
                                    <th className="cm-header-table-colum-header"
                                        key={column.name}
                                        style={{ width: column.width }}
                                        id={column.name}
                                    >
                                        <DndProvider backend={HTML5Backend}>
                                            <DraggableColumnHeader column={column} moveCard={this.moveCard}
                                                onThClick={() => this.onThClick(column)}
                                                onClick={() => this.props.openColMenuModel(column)}
                                                onMouseDown={(e) => this.setColumnToResize(e, column)}
                                            >
                                                {/* <div className="cm-column-header-content-holder" >
                                                    <div className="cm-column-header-label" onClick={() => this.onThClick(column)}>
                                                        {column.orderDirection != "" && `${column.orderDirection} `}{column.label}
                                                    </div>
                                                    < div className="cm-column-header-menu-holder">
                                                        <Button
                                                            onClick={() => this.props.openColMenuModel(column)}
                                                            size="sm"
                                                            className="border-radius-0 cm-column-header-menu-btn"
                                                            style={{ marginRight: 5, marginLeft: 5, padding: '1px 4px' }}
                                                        >
                                                            <i style={{ padding: 0 }} className="fas fa-sliders-h"></i>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="cm-column-header-resize-bar"
                                                    onDragStart={e => e.preventDefault()}
                                                    onMouseDown={e => this.setColumnToResize(e, column)}
                                                >
                                                    &nbsp;</div> */}
                                            </DraggableColumnHeader>
                                        </DndProvider>

                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                </Table>
            </div >

        );
    }

    moveCard = (dragIndex: number, hoverIndex: number) => {
        const dragCard = this.props.colModels.filter(x => x.columnPosition == dragIndex)
        this.props.swapColumnPositions(dragIndex, hoverIndex)
        console.log('reorder')
        console.log(dragIndex)
        console.log(hoverIndex)
    }


    onHorizontalScroll = () => {
        var tableHeaderHolder = document.getElementById(`cm-table-header-holder-${this.props.RCMID}`);
        var dataTableHolder = document.getElementById(`cm-data-table-holder-${this.props.RCMID}`);
        dataTableHolder!.scrollLeft = tableHeaderHolder!.scrollLeft;
    }

    setColumnToResize(e: any, column: ColModel) {
        let startOffset = e.target.parentNode.offsetWidth - e.pageX;
        this.props.setColumnToResize(column, startOffset);
        TextSelection.disableTextSelectionOnPage();
    }

    onThClick = (column: ColModel) => {
        this.props.changeOrderDirection(column);
    };
}



const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: TableHeaderOwnProps): TableHeaderDispatchProps => {
    return {
        setColModels: (colModels: ColModel[]) => dispatch(ReactCrudMasterActions.setColModels(colModels)),
        resizeColumn: (e: MouseEvent) => dispatch(ReactCrudMasterActions.resizeColumn(e)),
        setColumnToResize: (column: (ColModel | null) = null, startOffset: (number | null) = null) => dispatch(ReactCrudMasterActions.setColumnToResize(column, startOffset)),
        resetTableoffsetWidth: () => dispatch(ReactCrudMasterActions.resetTableoffsetWidth()),
        changeOrderDirection: (column: ColModel) => dispatch(ReactCrudMasterActions.changeOrderDirection(column)),
        openColMenuModel: (colModel: ColModel) => dispatch(ColMenuModelActions.openModal(colModel)),
        swapColumnPositions: (columnPosition1: number, columnPosition2: number) => dispatch(ReactCrudMasterActions.swapColumnPositions(columnPosition1, columnPosition2)),
    };
}

const mapStateToProps = (state: AppState, props: TableHeaderOwnProps): TableHeaderStateProps => {
    return {
        colModels: state.reactCrudMaster.colModels,
        data: state.reactCrudMaster.data,
        tableWidth: state.reactCrudMaster.tableWidth,
        columnToResize: state.reactCrudMaster.columnToResize,
        RCMID: state.reactCrudMaster.RCMID,
        width: state.reactCrudMaster.width
    } as TableHeaderStateProps;
}

export default connect<TableHeaderStateProps, TableHeaderDispatchProps, TableHeaderOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(TableHeaderComponent);
