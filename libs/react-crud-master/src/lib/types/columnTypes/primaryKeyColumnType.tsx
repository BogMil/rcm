import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { CreateMode, ColModel } from '../colModel/colModel';
import { InputControlTypes } from '../..';
import { getPropertyValueByString } from '../../utils/objectHelper';
import React from 'react';
import { InputControlType } from '../inputControlTypes/commonInterfaces';
import { NoneInputControlType } from '../inputControlTypes/noneInputControlType';
export interface PrimaryKeyOptions {
  show?: boolean;
}
export class PrimaryKey implements IColumnType, PrimaryKeyProps {
  defaultInputControl = (): InputControlType => new NoneInputControlType()
  render(colModel: ColModel, dataRow: any, index: any): JSX.Element {
    return <td key={index} className="cm-data-cell" style={{ width: colModel.width }
    } > {getPropertyValueByString(dataRow, colModel.name)
      } </td >;
  }
  show: boolean = false;
  get name() { return ColumnTypeNames.PRIMARY_KEY }

  constructor(config?: PrimaryKeyOptions) {
    Object.assign(this, config);
  }
}

export interface PrimaryKeyProps {
  show: boolean;
}
