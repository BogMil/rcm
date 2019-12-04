import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'

import { InputControlTypeNames } from '../../constants/InputControlTypeNames'

export interface IntegerConfig extends CommonInputTypeConfigProps { }

export default class IntegerInputControlType implements InputControlType, IntegerConfig {
    controlLabel?: string

    get inputType() { return InputControlTypeNames.INTEGER }

    constructor(config?: Partial<IntegerConfig>) {
        Object.assign(this, config);
    }
}
