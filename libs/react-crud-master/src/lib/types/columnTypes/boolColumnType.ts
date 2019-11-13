import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { CreateMode } from '../colModel/colModel';
import { InputControlTypes } from '../inputControlTypes/inputControlTypesTest';

export interface BoolOptions {
    show?: boolean;
    valueColumnName: string
    options?: [string | number, string][]
    optionsUrl?: string
}
export class Bool implements IColumnType, BoolProps {
    createMode: CreateMode = {
        InputControl: InputControlTypes.Bool({ presentationType: InputControlTypes.BoolPresentationTypes.CHECKBOX() })
    };
    show: boolean = false;
    valueColumnName: string;
    options?: [string, string][]
    optionsUrl?: string
    get name() { return ColumnTypeNames.FOREIGN_KEY }

    constructor(config: BoolOptions) {
        Object.assign(this, config);
    }
}

export interface BoolProps {
    show: boolean;
    valueColumnName: string
    options?: [string | number, string][]
    optionsUrl?: string
}