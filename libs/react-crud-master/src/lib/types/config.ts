import { InputControlTypes } from './inputControlTypesTest'
import { InputControlType } from './inputControlTypes/commonInterfaces'
import { ColModel } from './colModel';
export class UserConfig implements UserConfigFieldProps {

    public constructor(init?: Partial<UserConfig>) {

        if (init == undefined) return;

        this.dataOptions = Object.assign({}, this.dataOptions, init.dataOptions);
    }
    public dataOptions: DataOptions;
    public colModels: ColModel[];
}

export interface UserConfigFieldProps {
    dataOptions: DataOptions;
    colModels: ColModel[],
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