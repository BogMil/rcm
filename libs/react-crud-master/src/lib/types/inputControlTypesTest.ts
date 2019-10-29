import { BoolOptions, Bool } from './inputControlTypes/bool'
import { CommonInputTypeConfigProps, InputControlType } from './inputControlTypes/commonInterfaces'
import { InputControlTypeNames } from '../constants/InputControlTypeNames'

export const InputControlTypes = {

    /**
     * @function
     * @param  {String} presentationType - switch or checkbox
     */
    Bool: (boolConfig?: Partial<BoolOptions>) => {
        return new Bool(boolConfig)
    },
    BoolPresentationTypes: {
        CHECKBOX(options?: Partial<CheckboxBoolPresentationTypeOptions>) { return new CheckboxBoolPresentationType(options) },
        SWITCH(options?: Partial<SwitchBoolPresentationTypeOptions>) { return new SwitchBoolPresentationType(options) },
        SELECT(options?: Partial<SelectBoolPresentationType>) { return new SelectBoolPresentationType(options) }
    },
    string: () => {
        return new String()
    },
    StringPresentationTypes: {
        TEXTAREA(rows: number) { return 'textarea' },
        get TEXTBOX() { return new SelectBoolPresentationType() }
    },
}

interface CheckSwitchBoolPresentationTypeOptions {
    label: string
}
export class CheckboxSwitchBoolPresentationType implements CheckSwitchBoolPresentationTypeOptions {
    constructor(options?: Partial<CheckSwitchBoolPresentationTypeOptions>) {
        Object.assign(this, options)
    }
    label: string = 'bool label'
}

interface CheckboxBoolPresentationTypeOptions extends CheckSwitchBoolPresentationTypeOptions { }
export class CheckboxBoolPresentationType extends CheckboxSwitchBoolPresentationType {
    constructor(options?: Partial<CheckboxBoolPresentationTypeOptions>) {
        super(options)
    }
}

interface SwitchBoolPresentationTypeOptions extends CheckSwitchBoolPresentationTypeOptions { }
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



export interface StringConfig extends CommonInputTypeConfigProps {
    presentationType: string,
    disabled: boolean,
}

export class String implements InputControlType, StringConfig {
    presentationType: string
    disabled: boolean
    controlLabel?: string

    get inputType() { return InputControlTypeNames.STRING }
}