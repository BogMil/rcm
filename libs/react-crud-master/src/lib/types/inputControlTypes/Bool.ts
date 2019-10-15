import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'
import { SelectBoolPresentationType, SwitchBoolPresentationType, CheckboxBoolPresentationType } from '../InputControlTypes'

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