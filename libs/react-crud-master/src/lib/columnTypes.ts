
export const ColTypes = {
    INTEGER: 'INTEGER',
    DECIMAL: 'DECIMAL',
    STRING: 'STRING',
    TEXTAREA: 'TEXTAREA',
    BOOL: 'BOOL',
    IMAGE: 'IMAGE',
    FILE: 'FILE',
    DATETIME: 'DATETIME',
    FKEY: 'FKEY',
    /**
     * @function
     * @param  {String} type - switch or checkbox
     */
    bool: (type: string) => {
        return new Bool(type)
    },
    BoolPresentationTypes: {
        SWITCH: 'switch',
        CHECKBOX: 'checkbox',
    },
    string: () => {
        return new String()
    }
}


export class Bool implements InputType {

    get inputType() { return ColTypes.BOOL }
    public presentationType: string
    public tFunc = () => { console.log('asd') }

    /**
     * @constructor
     * @param  {String} presentationType - switch or checkbox
     */
    constructor(presentationType: string, ) {
        this.presentationType = presentationType
    }


}

class String implements InputType {

    get inputType() { return ColTypes.STRING }
}

export interface InputType {
    inputType: string
}
