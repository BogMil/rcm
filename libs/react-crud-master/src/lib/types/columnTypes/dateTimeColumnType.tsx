import React from 'react';
import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { getPropertyValueByString } from '../../utils/objectHelper';
import { ColModel } from '../..';
import { InputControlType } from '../inputControlTypes/commonInterfaces';
import DateTimeInputControlType from '../inputControlTypes/dateTimeControlType';

export interface DateTimeOptions {
}
export default class DateTimeColumnType implements IColumnType {
  defaultInputControl = (): InputControlType => new DateTimeInputControlType();

  render(colModel: ColModel, dataRow: any, index: any): JSX.Element {
    return <td key={index} className="cm-data-cell" style={{ width: colModel.width }}> {getPropertyValueByString(dataRow, colModel.name).toLocaleDateString()} </td>;
  }
  get name() { return ColumnTypeNames.DATE_TIME }
  get show() { return true }
  constructor(config?: Partial<DateTimeOptions>) {
    Object.assign(this, config);
  }
}
