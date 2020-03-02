import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { getPropertyValueByString } from '../../utils/objectHelper';
import React from 'react';
import { ColModel } from '../..';
import IntegerInputControlType from '../inputControlTypes/integerInpuntControlType';
import { InputControlType } from '../inputControlTypes/commonInterfaces';

export interface IntegerOptions {
}
export default class IntegerColumnType implements IColumnType {
  defaultInputControl = (): InputControlType => new IntegerInputControlType();
  render(colModel: ColModel, dataRow: any, index: any): JSX.Element {
    return <td key={index} className="cm-data-cell" style={{ width: colModel.width }}> {getPropertyValueByString(dataRow, colModel.name)} </td>;
  }
  get name() { return ColumnTypeNames.INTEGER }
  get show() { return true }
  constructor(config?: Partial<IntegerOptions>) {
    Object.assign(this, config);
  }
}
