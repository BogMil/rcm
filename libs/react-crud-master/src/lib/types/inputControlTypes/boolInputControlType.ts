import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'

export interface BoolOptions extends CommonInputTypeConfigProps {
    presentationType: SelectBoolPresentationType | SwitchBoolPresentationType | CheckboxBoolPresentationType,
    disabled: boolean,
    default: boolean
}
export class Bool implements InputControlType, BoolOptions {
    get inputType() { return InputControlTypeNames.BOOL }
    public presentationType: SelectBoolPresentationType | SwitchBoolPresentationType | CheckboxBoolPresentationType
    public disabled: boolean
    public default: boolean
    public controlLabel: string

    /**
     * @constructor
     * @param  {String} presentationType - switch or checkbox
     */
    constructor(boolConfig?: Partial<BoolOptions>) {
        Object.assign(this, boolConfig);
    }
}

export interface CheckSwitchBoolPresentationTypeOptions {
    label: string
}
export class CheckboxSwitchBoolPresentationType implements CheckSwitchBoolPresentationTypeOptions {
    constructor(options?: Partial<CheckSwitchBoolPresentationTypeOptions>) {
        Object.assign(this, options)
    }
    label: string = 'bool label'
}

export interface CheckboxBoolPresentationTypeOptions extends CheckSwitchBoolPresentationTypeOptions { }
export class CheckboxBoolPresentationType extends CheckboxSwitchBoolPresentationType {
    constructor(options?: Partial<CheckboxBoolPresentationTypeOptions>) {
        super(options)
    }
}

export interface SwitchBoolPresentationTypeOptions extends CheckSwitchBoolPresentationTypeOptions { }
export class SwitchBoolPresentationType extends CheckboxSwitchBoolPresentationType {
    constructor(options?: Partial<SwitchBoolPresentationTypeOptions>) {
        super(options)
    }
}

export class SelectBoolPresentationType {
    constructor(init?: Partial<SelectBoolPresentationType>) {
        Object.assign(this, init)
    }
    trueLabel: string = 'true'
    trueValue: any = true
    falseLabel: string = 'false'
    falseValue: any = false
    default: boolean = true
}