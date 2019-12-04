import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'

export interface IntegerOptions {
}
export default class IntegerColumnType implements IColumnType {
    get name() { return ColumnTypeNames.INTEGER }
    get show() { return true }
    constructor(config?: Partial<IntegerOptions>) {
        Object.assign(this, config);
    }
}