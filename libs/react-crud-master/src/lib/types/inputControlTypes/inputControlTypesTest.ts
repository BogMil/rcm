import { BoolOptions, Bool, CheckboxBoolPresentationTypeOptions, CheckboxBoolPresentationType, SwitchBoolPresentationTypeOptions, SwitchBoolPresentationType, SelectBoolPresentationType } from './boolInputControlType'
import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'
import { StringInputControlType, StringConfig } from './stringInputControlType'
import { SelectOptions, Select } from './selectInputControlType'
import { None } from './noneInputControlType'

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
    String: (config?: Partial<StringConfig>) => {
        return new StringInputControlType(config)
    },

    Select: (options: SelectOptions) => {
        return new Select(options)
    },

    None: () => {
        return new None()
    },
}





