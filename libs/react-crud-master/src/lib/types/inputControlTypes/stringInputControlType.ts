import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'

import { InputControlTypeNames } from '../../constants/InputControlTypeNames'

export interface StringConfig extends CommonInputTypeConfigProps {
    presentationType: TextBox | TextArea,
    disabled: boolean,
}

export class StringInputControlType implements InputControlType, StringConfig {
    presentationType: TextBox | TextArea = new TextBox()
    disabled: boolean
    controlLabel?: string

    get inputType() { return InputControlTypeNames.STRING }

    constructor(config?: Partial<StringConfig>) {
        Object.assign(this, config);
    }

    public static presentaionTypes: { TEXTBOX: () => TextBox, TEXTAREA: (config?: Partial<TextAreaOptions>) => TextArea } = {
        TEXTBOX() { return new TextBox() },
        TEXTAREA(config?: Partial<TextAreaOptions>) { return new TextArea(config) }
    }
}

export class TextBox { }

export interface TextAreaOptions {
    rows: number,
    resizable: boolean
}
export class TextArea implements TextAreaOptions {
    resizable: boolean = false
    rows: number = 2
    constructor(config?: Partial<TextAreaOptions>) {
        Object.assign(this, config);
    }
}