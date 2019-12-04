import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'

import { InputControlTypeNames } from '../../constants/InputControlTypeNames'

export interface DecimalConfig extends CommonInputTypeConfigProps { }

export default class DecimalInputControlType implements InputControlType, DecimalConfig {
    controlLabel?: string

    get inputType() { return InputControlTypeNames.DECIMAL }

    constructor(config?: Partial<DecimalConfig>) {
        Object.assign(this, config);
    }
}
