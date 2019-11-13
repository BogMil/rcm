import { InputControlTypes } from './inputControlTypes/inputControlTypesTest'
import { InputControlType } from './inputControlTypes/commonInterfaces'
import { ColModel } from './colModel/colModel';
export class UserConfig implements UserConfigFieldProps {

    public constructor(init?: Partial<UserConfig>) {

        if (init == undefined) return;

        Object.assign(this, init);
    }
    rows?: any;
    numOfRowsPerPage?: number = 2;
    listOfNumOfRowsPerPage?: number[] = [5, 10, 20, 30]
    url?: any;
    colModels: ColModel[] = null;
    tableTitle?: string = "tilovina"
}

export interface UserConfigFieldProps {
    rows?: any[];
    url?: any;
    numOfRowsPerPage?: number;
    listOfNumOfRowsPerPage?: number[];
    colModels: ColModel[];
    tableTitle?: string;
}

export interface CreateMode extends CreateModeMethods, CreateModeProps { }
export interface CreateModeMethods {
}
export interface CreateModeProps {
}

export interface UserConfigMethodsCreateMode {
}

export class UserConfigMethods implements UserConfigMethodsCreateMode {

}

export class UserConfigMethodsExtractor {
}
///////////////
// export interface DataOptions {
//     rows?: any;
//     url?: any;
// }