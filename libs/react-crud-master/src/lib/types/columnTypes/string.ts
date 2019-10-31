import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'

export interface StringOptions {
}
export class String implements IColumnType {
    get name() { return ColumnTypeNames.STRING }
    get show() { return true }
    constructor(config?: Partial<StringOptions>) {
        Object.assign(this, config);
    }
}