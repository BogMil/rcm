import { BoolConfig, Bool } from './inputControlTypes/Bool'
import { CommonInputTypeConfigProps, InputControlType } from './inputControlTypes/commonInterfaces'
import { InputControlTypeNames } from '../constants/InputControlTypeNames'

export const InputControlTypes = {

    /**
     * @function
     * @param  {String} presentationType - switch or checkbox
     */
    Bool: (boolConfig?: Partial<BoolConfig>) => {
        return new Bool(boolConfig)
    },
    BoolPresentationTypes: {
        get SWITCH() { return 'switch' },
        get CHECKBOX() { return 'checkbox' }
    },
    string: () => {
        return new String()
    },
    StringPresentationTypes: {
        TEXTAREA(rows: number) { return 'textarea' },
        get TEXTBOX() { return 'textbox' }
    },
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