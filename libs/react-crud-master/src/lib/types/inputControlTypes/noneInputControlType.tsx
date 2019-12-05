import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'

export interface NoneOptions extends CommonInputTypeConfigProps {
}
export class None implements InputControlType, NoneOptions {

    get inputType() { return InputControlTypeNames.NONE }
    disabled: boolean = false;
    default: boolean;
    controlLabel: string;
    options?: [string, string][];
    optionsUrl?: string;

    constructor(boolConfig?: Partial<NoneOptions>) {
        Object.assign(this, boolConfig);
    }

    render(rowData: import("../../components/crudModal/crudModal.types").IRowData, column: import("../..").ColModel, onRowDataChange: (name: string, value: any) => void): JSX.Element {
        return null;
    }
}