import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'

export interface BoolConfig extends CommonInputTypeConfigProps {
    presentationType: string,
    disabled: boolean,
    label: string
}
export class Bool implements InputControlType, BoolConfig {
    get inputType() { return InputControlTypeNames.BOOL }
    public presentationType: string
    public disabled: boolean
    public label: string
    public controlLabel: string

    public tFunc = () => { console.log('asd') }

    /**
     * @constructor
     * @param  {String} presentationType - switch or checkbox
     */
    constructor(boolConfig?: Partial<BoolConfig>) {
        Object.assign(this, boolConfig);
    }
}