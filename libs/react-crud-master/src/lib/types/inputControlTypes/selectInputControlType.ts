import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'

export interface SelectOptions extends CommonInputTypeConfigProps {
    disabled?: boolean,
    default?: boolean,
    options?: [string, string][]
    optionsUrl?: string
}
export class Select implements InputControlType, SelectOptions {
    get inputType() { return InputControlTypeNames.SELECT }
    disabled: boolean = false;
    default: boolean;
    controlLabel: string;
    options?: [string, string][];
    optionsUrl?: string;

    constructor(boolConfig?: Partial<SelectOptions>) {
        Object.assign(this, boolConfig);
    }
}