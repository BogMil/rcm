import { InputControlTypes } from './inputControlTypesTest'
import { InputControlType } from './inputControlTypes/commonInterfaces'
import { ColModel } from './colModel';
export class UserConfig implements UserConfigFieldProps {

    public constructor(init?: Partial<UserConfig>) {

        if (init == undefined) return;

        Object.assign(this, init);
    }
    public rows?: any;
    public url?: any;
    public colModels: ColModel[] = null;
    tableTitle?: string = "tilovina"
}

export interface UserConfigFieldProps {
    rows?: any[];
    url?: any;
    colModels: ColModel[],
    tableTitle?: string
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
export interface DataOptions {
    rows?: any;
    url?: any;
}