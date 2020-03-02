import React from 'react';
import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { ColModel } from '../colModel/colModel';
import { getPropertyValueByString } from '../../utils/objectHelper';

export interface BoolOptions {
  show?: boolean;
}
export class Bool implements IColumnType, BoolProps {

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
