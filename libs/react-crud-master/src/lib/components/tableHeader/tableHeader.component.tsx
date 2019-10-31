import React, { Component, FormEvent, ChangeEvent, useState, useCallback } from "react";
import {
    Table,
    Modal,
    Button,
    Form,
    FormControl,
} from "react-bootstrap";
import '../contexMenu.css';
import '../reactCrudMaster/reactCrudMaster.css';

import { Provider, connect, useDispatch, useSelector } from 'react-redux'
import { createStore } from 'redux'
import * as Redux from 'redux'
import { ColModel } from "../../types/colModel/colModel";
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
import { ColumnTypeNames } from '../../constants/columnTypeNames';

export default function TableHeaderComponent() {
    const dispatch = useDispatch();
    const store = useSelector((state: AppState) => state.reactCrudMaster) as TableHeaderStateProps;

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const dragCard = store.colModels.filter(x => x.columnPosition == dragIndex)
        dispatch(ReactCrudMasterActions.swapColumnPositions(dragIndex, hoverIndex))
    }

    const onHorizontalScroll = () => {
        var tableHeaderHolder = document.getElementById(`cm-table-header-holder-${store.RCMID}`);
        var dataTableHolder = document.getElementById(`cm-data-table-holder-${store.RCMID}`);
        dataTableHolder!.scrollLeft = tableHeaderHolder!.scrollLeft;
    }

    const setColumnToResize = (e: any, column: ColModel) => {
        let startOffset = e.target.parentNode.offsetWidth - e.pageX;
        dispatch(ReactCrudMasterActions.setColumnToResize(column, startOffset));
        TextSelection.disableTextSelectionOnPage();
    }

    const onThClick = (column: ColModel) => {
        dispatch(ReactCrudMasterActions.changeOrderDirection(column));
    };
    return (
        <div className='cm-table-header-holder' id={`cm-table-header-holder-${store.RCMID}`} onScroll={onHorizontalScroll}>
            <Table className="cm-header-table" striped bordered hover size="sm"
                style={{
                    width: store.tableWidth,
                    borderLeft: 0,
                    borderRight: 0
                }}
            >
                <thead className='cm-header-table-thead'>
                    <tr>
                        {store.colModels.map((column) => {
                            if (column.columnType.show)
                                return (
                                    <th className="cm-header-table-colum-header"
                                        key={column.name}
                                        style={{ width: column.width }}
                                        id={column.name}
                                    >
                                        <DndProvider backend={HTML5Backend}>
                                            <DraggableColumnHeader column={column} moveCard={moveCard}
                                                onThClick={() => onThClick(column)}
                                                onClick={() => dispatch(ColMenuModelActions.openModal(column))}
                                                onMouseDown={(e) => setColumnToResize(e, column)}
                                            >
                                                {/* <div className="cm-column-header-content-holder" >
                                                <div className="cm-column-header-label" onClick={() => this.onThClick(column)}>
                                                    {column.orderDirection != "" && `${column.orderDirection} `}{column.label}
                                                </div>
                                                < div className="cm-column-header-menu-holder">
                                                    <Button
                                                        onClick={() => store.openColMenuModel(column)}
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
                    <tr>
                        {store.colModels.map((column) => {
                            if (column.columnType.show)
                                return (
                                    <th className="cm-header-table-colum-header"
                                        key={column.name}
                                        style={{ width: column.width }}
                                        id={column.name}
                                    >
                                        <div className="columnFilterInputControl" style={{ display: 'flex' }}>
                                            <div>
                                                <Form.Control style={{ borderRadius: 0, padding: 0, paddingLeft: 2, height: 25, width: 25, fontSize: 11 }} as="select">
                                                    <option title="asdasdsd">eq</option>
                                                    <option>lq</option>
                                                    <option>32</option>
                                                    <option>42</option>
                                                    <option>52</option>
                                                </Form.Control>
                                            </div>
                                            <div style={{ width: '100%' }}>
                                                <FormControl style={{ borderRadius: 0, padding: 0, paddingLeft: 2, height: 25 }}></FormControl>
                                            </div>
                                        </div>

                                    </th>
                                );
                        })}
                    </tr>
                </thead>
            </Table>
        </div >

    );
}