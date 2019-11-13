import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { CreateMode } from '../colModel/colModel';
import { InputControlTypes } from '../inputControlTypes/inputControlTypesTest';

export interface StringOptions {
}
export class StringColumnType implements IColumnType {
    createMode: CreateMode;
    get name() { return ColumnTypeNames.STRING }
    get show() { return true }
    constructor(config?: Partial<StringOptions>) {
        Object.assign(this, config);

        this.createMode = {
            InputControl: InputControlTypes.String()
        };
    }
}