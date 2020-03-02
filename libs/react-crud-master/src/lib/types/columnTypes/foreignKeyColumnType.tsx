import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { CreateMode, ColModel } from '../colModel/colModel';
import { InputControlTypes } from '../..';
import { getPropertyValueByString } from '../../utils/objectHelper';

import React from 'react';
import { SelectInputControlType } from '../inputControlTypes/selectInputControlType';
import { InputControlType } from '../inputControlTypes/commonInterfaces';
export interface ForeignKeyOptions {
  show?: boolean;
  valueColumnName: string
  options?: [string | number, string][]
  optionsUrl?: string,
  valueWithDependenciesUrl?: string,
  dependencies?: ForeignKeyDependency[]
}
export class ForeignKey implements IColumnType, ForeignKeyProps {
  defaultInputControl = (): InputControlType => new SelectInputControlType();
  render(colModel: ColModel, dataRow: any, index: any): JSX.Element {
    return <td key={index} className="cm-data-cell" style={{ width: colModel.width }}> {getPropertyValueByString(dataRow, colModel.name)} </td>;
  }
  show: boolean = false;
  valueColumnName: string;
  options?: [string, string][]
  optionsUrl?: string
  dependencies?: ForeignKeyDependency[]
  valueWithDependenciesUrl?: string

  get name() { return ColumnTypeNames.FOREIGN_KEY }

  constructor(config: ForeignKeyOptions) {
    Object.assign(this, config);
  }
}

export interface ForeignKeyProps {
  show: boolean;
  valueColumnName: string
  options?: [string | number, string][]
  optionsUrl?: string
  dependencies?: ForeignKeyDependency[]
  valueWithDependenciesUrl?: string
}

////////////////////

export interface ForeignKeyDependencyProps {
  options: [string | number, string][]
  optionsUrl: string
  dependency: ForeignKeyDependency
}

export class ForeignKeyDependency implements ForeignKeyDependencyProps {
  dependency: ForeignKeyDependency;
  options: [string | number, string][];
  optionsUrl: string;

  constructor(config: Partial<ForeignKeyDependencyProps>) {

    Object.assign(this, config);
  }
}
