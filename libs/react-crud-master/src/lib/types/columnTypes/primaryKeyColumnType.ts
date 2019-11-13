import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'
import { CreateMode } from '../colModel/colModel';
import { InputControlTypes } from '../..';

export interface PrimaryKeyOptions {
    show?: boolean;
}
export class PrimaryKey implements IColumnType, PrimaryKeyProps {
    createMode: CreateMode;
    show: boolean = false;
    get name() { return ColumnTypeNames.PRIMARY_KEY }

    constructor(config?: PrimaryKeyOptions) {
        Object.assign(this, config);

        this.createMode = {
            InputControl: InputControlTypes.None()
        };
    }
}

export interface PrimaryKeyProps {
    show: boolean;
}