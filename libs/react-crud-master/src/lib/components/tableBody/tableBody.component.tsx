import React from "react";
import {
  Table,
} from "react-bootstrap";
import './tableBody.css'

import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../rootReducer'
import { TableBodyStateProps } from "./tableBody.types";
import * as ReactableActions from '../reactCrudMaster/reactCrudMaster.actions'
import { getPropertyValueByString } from '../../utils/objectHelper';
import { ColumnTypeNames } from '../../constants/columnTypeNames';

export default function TableBodyComponent() {
  const dispatch = useDispatch();
  const store = useSelector((state: AppState) => {
    return {
      ...state.reactCrudMaster,
      rows: state.reactCrudMaster.data.rows,
      selectedRow: state.reactCrudMaster.selectedRow,
      RCMID: state.reactCrudMaster.RCMID,
      tableWidth: state.reactCrudMaster.tableWidth,
      colModels: state.reactCrudMaster.colModels,
      contextMenuTrigger: state.contextMenuModal.contextMenuTrigger
    }
  }) as TableBodyStateProps;

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

  return (
    <div id={`cm-data-table-holder-${store.RCMID}`} className="cm-data-table-holder" onScroll={(e: any) => testScroll(e)}>
      <Table className="cm-data-table" striped bordered hover size="sm"
        style={{
          width: store.tableWidth,
          borderLeft: 0,
          borderRight: 0
        }}>
        <tbody className="cm-data-table-tbody">
          {store.rows &&
            store.rows.map((dataRow, index) => {
              return (
                <tr
                  key={index}
                  className={dataRow == store.selectedRow ? "cm-selected-row cm-data-row" : "cm-data-row"}
                  onClick={() => onClickOnRow(dataRow)}
                  onContextMenu={(e: any) => onRightClickOnRow(e, dataRow)}
                >
                  {
                    store.colModels.map((colModel, index) => {
                      if (colModel.columnType.show) {

                        // if (colModel.columnType.name == ColumnTypeNames.BOOL) {
                        return colModel.columnType.render(colModel, dataRow, index);
                        // }

                        // if (colModel.columnType.name == ColumnTypeNames.DATE_TIME) {
                        //   return <td key={index} className="cm-data-cell" style={{ width: colModel.width }}> {getPropertyValueByString(dataRow, colModel.name).toLocaleDateString()} </td>;
                        // }

                        // return <td key={index} className="cm-data-cell" style={{ width: colModel.width }}> {getPropertyValueByString(dataRow, colModel.name)} </td>;
                      }
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
