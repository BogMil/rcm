import React from 'react';
import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { ColModel } from '../colModel/colModel';
import { getPropertyValueByString } from '../../utils/objectHelper';
import { InputControlType } from '../inputControlTypes/commonInterfaces';
import { BoolInputControlType } from '../inputControlTypes/boolInputControlType';

export interface BoolOptions {
  show?: boolean;
}
export class BoolColType implements IColumnType, BoolProps {
  defaultInputControl = (): InputControlType => new BoolInputControlType();

  show: boolean = true;
  get name() { return ColumnTypeNames.BOOL }

  constructor(config?: BoolOptions) {
    Object.assign(this, config);
  }

  render(colModel: ColModel, dataRow: any, index: any) {
    return (<td key={index} className="cm-data-cell" style={{ width: colModel.width }}> {getPropertyValueByString(dataRow, colModel.name) == true ? 'true' : 'false'} </td >);
  }
}

export interface BoolProps {

}
