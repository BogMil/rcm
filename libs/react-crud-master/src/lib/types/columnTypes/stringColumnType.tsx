import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { ColModel } from '../colModel/colModel';
// import { InputControlTypes } from '../inputControlTypes/inputControlTypesTest';
import React from 'react';
import { getPropertyValueByString } from '../../utils/objectHelper';

export interface StringOptions {
}
export class StringColumnType implements IColumnType {


  get name() { return ColumnTypeNames.STRING }
  get show() { return true }
  constructor(config?: Partial<StringOptions>) {
    Object.assign(this, config);
  }

  render(colModel: ColModel, dataRow: any, index: any): JSX.Element {
    return <td key={index} className="cm-data-cell" style={{ width: colModel.width }}> {getPropertyValueByString(dataRow, colModel.name)} </td>;

  }
}
