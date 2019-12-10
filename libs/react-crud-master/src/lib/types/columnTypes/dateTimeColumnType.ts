import { IColumnType } from './commonInterfaces'
import { ColumnTypeNames } from '../../constants/columnTypeNames'

export interface DateTimeOptions {
}
export default class DateTimeColumnType implements IColumnType {
    get name() { return ColumnTypeNames.DATE_TIME }
    get show() { return true }
    constructor(config?: Partial<DateTimeOptions>) {
        Object.assign(this, config);
    }
}