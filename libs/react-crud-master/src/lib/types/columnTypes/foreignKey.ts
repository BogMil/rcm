import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'

export interface ForeignKeyOptions {
    show?: boolean;
    valueColumnName: string
    options?: [string | number, string][]
    optionsUrl?: string
}
export class ForeignKey implements IColumnType, ForeignKeyProps {
    show: boolean = false;
    valueColumnName: string;
    options?: [string, string][]
    optionsUrl?: string
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
}