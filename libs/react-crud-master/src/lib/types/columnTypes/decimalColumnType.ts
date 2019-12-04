import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'

export interface DecimalOptions {
}
export default class DecimalColumnType implements IColumnType {
    get name() { return ColumnTypeNames.DECIMAL }
    get show() { return true }
    constructor(config?: Partial<DecimalOptions>) {
        Object.assign(this, config);
    }
}