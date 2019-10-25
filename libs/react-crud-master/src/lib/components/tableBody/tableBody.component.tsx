import React, { Component } from "react";
import {
    Table,
} from "react-bootstrap";
import './tableBody.css'

import { connect, useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../rootReducer'
import { TableBodyProps, TableBodyState, initialState, TableBodyOwnProps, TableBodyDispatchProps, TableBodyStateProps } from "./tableBody.types";
import * as ReactableActions from '../reactCrudMaster/reactCrudMaster.actions'
import { ThunkDispatch } from "redux-thunk";
import { colModels } from '../../testData';

export default function TableBodyComponent() {
    const dispatch = useDispatch();
    const store = useSelector((state: AppState) => { return { ...state.reactCrudMaster, contextMenuTrigger: state.contextMenuModal.contextMenuTrigger } }) as TableBodyStateProps;

    const onClickOnRow = (row: any) => {
        dispatch(ReactableActions.selectRow(row));
    };

    const onRightClickOnRow = (e: any, row: any) => {
        e.preventDefault();
        openContextMenu(e);
        onClickOnRow(row);
    }

    const openContextMenu = (e: any) => {
        // if (store.contextTrigger != null)
        console.log(store);
        store.contextMenuTrigger.handleContextClick(e);
    };

    const testScroll = (e: any) => {
        var x = document.getElementById(`cm-table-header-holder-${store.RCMID}`);
        x!.scrollLeft = e.target.scrollLeft

        var z = document.getElementsByClassName('react-contextmenu--visible') as HTMLCollectionOf<HTMLElement>;
        if (z.length > 0)
            for (var i = 0; i < z.length; i++) {
                (z.item(i))!.style.opacity = "0";
                (z.item(i))!.style.pointerEvents = "none";
                (z.item(i))!.classList.remove('react-contextmenu--visible');
            }
    }

    const byString = (object, propertyName) => {
        var parts = propertyName.split("."),
            length = parts.length,
            i,
            property = object;

        for (i = 0; i < length; i++) {
            property = property[parts[i]];
        }

        return property;
    }

    return (
        <div id={`cm-data-table-holder-${store.RCMID}`} className="cm-data-table-holder" onScroll={(e: any) => testScroll(e)}>
            <Table className="cm-data-table" striped bordered hover size="sm"
                style={{
                    width: store.tableWidth + 1,
                    //20 moz
                    //7 chrome,
                    borderLeft: 0,
                    borderRight: 0
                }}>
                <tbody className="cm-data-table-tbody">
                    {store.data &&
                        store.data.map((dataRow, index) => {
                            return (
                                <tr
                                    key={index}
                                    className={dataRow == store.selectedRow ? "cm-selected-row cm-data-row" : "cm-data-row"}
                                    onClick={() => onClickOnRow(dataRow)}
                                    onContextMenu={(e: any) => onRightClickOnRow(e, dataRow)}
                                >
                                    {
                                        store.colModels.map((colModel, index) => {
                                            return <td key={index} className="cm-data-cell" style={{ width: colModel.width }}> {byString(dataRow, colModel.name)} </td>;
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

// class TableBodyComponent extends Component<TableBodyProps, TableBodyState>{

//     onClickOnRow = (row: any) => {
//         this.props.selectRow(row);
//     };

//     onRightClickOnRow = (e: any, row: any) => {
//         e.preventDefault();
//         this.openContextMenu(e);
//         this.onClickOnRow(row);
//     }

//     openContextMenu = (e: any) => {
//         // if (this.props.contextTrigger != null)
//         this.props.contextTrigger.handleContextClick(e);
//     };

//     testScroll = (e: any) => {
//         var x = document.getElementById(`cm-table-header-holder-${this.props.RCMID}`);
//         x!.scrollLeft = e.target.scrollLeft

//         var z = document.getElementsByClassName('react-contextmenu--visible') as HTMLCollectionOf<HTMLElement>;
//         if (z.length > 0)
//             for (var i = 0; i < z.length; i++) {
//                 (z.item(i))!.style.opacity = "0";
//                 (z.item(i))!.style.pointerEvents = "none";
//                 (z.item(i))!.classList.remove('react-contextmenu--visible');
//             }
//     }

//     byString = (object, propertyName) => {
//         var parts = propertyName.split("."),
//             length = parts.length,
//             i,
//             property = object;

//         for (i = 0; i < length; i++) {
//             property = property[parts[i]];
//         }

//         return property;
//     }

//     render() {
//         return (
//             <div id={`cm-data-table-holder-${this.props.RCMID}`} className="cm-data-table-holder" onScroll={(e: any) => this.testScroll(e)}>
//                 <Table className="cm-data-table" striped bordered hover size="sm"
//                     style={{
//                         width: this.props.tableWidth + 1,
//                         //20 moz
//                         //7 chrome,
//                         borderLeft: 0,
//                         borderRight: 0
//                     }}>
//                     <tbody className="cm-data-table-tbody">
//                         {this.props.data &&
//                             this.props.data.map((dataRow, index) => {
//                                 return (
//                                     <tr
//                                         key={index}
//                                         className={dataRow == this.props.selectedRow ? "cm-selected-row cm-data-row" : "cm-data-row"}
//                                         onClick={() => this.onClickOnRow(dataRow)}
//                                         onContextMenu={(e: any) => this.onRightClickOnRow(e, dataRow)}
//                                     >
//                                         {
//                                             this.props.colModels.map((colModel, index) => {
//                                                 return <td key={index} className="cm-data-cell" style={{ width: colModel.width }}> {this.byString(dataRow, colModel.name)} </td>;
//                                             })
//                                         }
//                                     </tr>
//                                 );
//                             })}
//                     </tbody>
//                 </Table >
//             </div>
//         );
//     }
// }



// const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): TableBodyDispatchProps => {
//     return {
//         selectRow: (row: any) => dispatch(ReactableActions.selectRow(row))
//     };
// }

// const mapStateToProps = (state: AppState): TableBodyStateProps => {
//     return {
//         colModels: state.reactCrudMaster.colModels,
//         data: state.reactCrudMaster.data,
//         tableWidth: state.reactCrudMaster.tableWidth,
//         RCMID: state.reactCrudMaster.RCMID,
//         width: state.reactCrudMaster.width,
//         selectedRow: state.reactCrudMaster.selectedRow,
//         contextTrigger: state.contextMenuModal.contextMenuTrigger
//     } as TableBodyStateProps;
// }

// export default connect<TableBodyStateProps, TableBodyDispatchProps, TableBodyOwnProps, AppState>(mapStateToProps, mapDispatchToProps)(TableBodyComponent);
