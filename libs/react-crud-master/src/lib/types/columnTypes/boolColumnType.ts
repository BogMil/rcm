import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { CreateMode } from '../colModel/colModel';
import { InputControlTypes } from '../inputControlTypes/inputControlTypesTest';

export interface BoolOptions {
    show?: boolean;
}
export class Bool implements IColumnType, BoolProps {
    show: boolean = true;
    // valueColumnName: string;
    // options?: [string, string][]
    // optionsUrl?: string
    get name() { return ColumnTypeNames.BOOL }

    constructor(config?: BoolOptions) {
        Object.assign(this, config);
    }
}

export interface BoolProps {
    // valueColumnName: string
    // options?: [string | number, string][]
    // optionsUrl?: string
}