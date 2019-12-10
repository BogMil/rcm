import { BoolOptions, Bool, CheckboxBoolPresentationTypeOptions, CheckboxBoolPresentationType, SwitchBoolPresentationTypeOptions, SwitchBoolPresentationType, SelectBoolPresentationType } from './boolInputControlType'
import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'
import { StringInputControlType, StringConfig } from './stringInputControlType'
import { SelectOptions, Select } from './selectInputControlType'
import { None } from './noneInputControlType'
import Decimal from './decimalInputControlType'
import IntegerColumnType from '../columnTypes/integerColumnType'
import IntegerInputControlType from './integerInpuntControlType'
import DateTimeColumnType from '../columnTypes/dateTimeColumnType'
import DateTimeInputControlType from './dateTimeControlType'

export const InputControlTypes = {

    /**
     * @function
     * @param  {String} presentationType - switch or checkbox
     */
    Bool: (boolConfig?: Partial<BoolOptions>) => new Bool(boolConfig),
    String: (config?: Partial<StringConfig>) => new StringInputControlType(config),
    Select: (options?: SelectOptions) => new Select(options),
    None: () => new None(),
    Decimal: () => new Decimal(),
    Integer: () => new IntegerInputControlType(),
    DateTime: () => new DateTimeInputControlType(),

    BoolPresentationTypes: {
        CHECKBOX(options?: Partial<CheckboxBoolPresentationTypeOptions>) { return new CheckboxBoolPresentationType(options) },
        SWITCH(options?: Partial<SwitchBoolPresentationTypeOptions>) { return new SwitchBoolPresentationType(options) },
        SELECT(options?: Partial<SelectBoolPresentationType>) { return new SelectBoolPresentationType(options) }
    },
}





