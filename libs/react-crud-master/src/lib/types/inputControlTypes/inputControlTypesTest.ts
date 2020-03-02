import { BoolOptions, BoolInputControlType, CheckboxBoolPresentationTypeOptions, CheckboxBoolPresentationType, SwitchBoolPresentationTypeOptions, SwitchBoolPresentationType, SelectBoolPresentationType } from './boolInputControlType'
import { StringInputControlType, StringConfig } from './stringInputControlType'
import { SelectOptions, SelectInputControlType } from './selectInputControlType'
import { NoneInputControlType } from './noneInputControlType'
import DecimalInputControlType from './decimalInputControlType'
import IntegerInputControlType from './integerInpuntControlType'
import DateTimeInputControlType from './dateTimeControlType'

export const InputControlTypes = {

  /**
   * @function
   * @param  {String} presentationType - switch or checkbox
   */
  Bool: (boolConfig?: Partial<BoolOptions>) => new BoolInputControlType(boolConfig),
  String: (config?: Partial<StringConfig>) => new StringInputControlType(config),
  Select: (options?: SelectOptions) => new SelectInputControlType(options),
  None: () => new NoneInputControlType(),
  Decimal: () => new DecimalInputControlType(),
  Integer: () => new IntegerInputControlType(),
  DateTime: () => new DateTimeInputControlType(),

  BoolPresentationTypes: {
    CHECKBOX(options?: Partial<CheckboxBoolPresentationTypeOptions>) { return new CheckboxBoolPresentationType(options) },
    SWITCH(options?: Partial<SwitchBoolPresentationTypeOptions>) { return new SwitchBoolPresentationType(options) },
    SELECT(options?: Partial<SelectBoolPresentationType>) { return new SelectBoolPresentationType(options) }
  },
}





