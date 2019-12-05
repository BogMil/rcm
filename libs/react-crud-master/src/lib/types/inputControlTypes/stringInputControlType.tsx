import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import React from 'react'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'
import { Form } from 'react-bootstrap'
import { getPropertyValueByString } from '../../utils/objectHelper'

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

    render(rowData: import("../../components/crudModal/crudModal.types").IRowData, column: import("../..").ColModel, onRowDataChange: (name: string, value: any) => void): JSX.Element {
        const renderStringInputControl = () => {
            let stringColumnType = column.InputControl as StringInputControlType

            if (stringColumnType.presentationType instanceof TextBox)
                return <Form.Control
                    onChange={(e: any) => onRowDataChange(column.name, e.target.value)}
                    type="text"
                    placeholder={column.name}
                    className="cm-crud-modal-text-input cm-input-control"
                    value={getPropertyValueByString(rowData, column.name)}
                />

            if (stringColumnType.presentationType instanceof TextArea)
                return <Form.Control
                    as="textarea" rows={stringColumnType.presentationType.rows}
                    onChange={(e: any) => onRowDataChange(column.name, e.target.value)}
                    type="text"
                    placeholder={column.name}
                    className="cm-crud-modal-text-input cm-input-control"
                    style={{ resize: stringColumnType.presentationType.resizable == true ? '' : 'none' }}
                    value={getPropertyValueByString(rowData, column.name)}
                />
        }

        let label = column.name

        return <div key={column.name} className="cm-crud-modal-input-holder">
            <Form.Group style={{ marginBottom: 5 }}>
                <Form.Label htmlFor={column.name} style={{ marginBottom: 0 }} >
                    {label}
                </Form.Label>
                {renderStringInputControl()}
            </Form.Group>
        </div>
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