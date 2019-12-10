import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import React from 'react'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'
import { Form } from 'react-bootstrap';
import { getPropertyValueByString } from '../../utils/objectHelper';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface DateTimeConfig extends CommonInputTypeConfigProps { }

export default class DateTimeInputControlType implements InputControlType, DateTimeConfig {

    controlLabel?: string

    get inputType() { return InputControlTypeNames.DATE_TIME }

    constructor(config?: Partial<DateTimeConfig>) {
        Object.assign(this, config);
    }

    render(rowData: import("../../components/crudModal/crudModal.types").IRowData, column: import("../..").ColModel, onRowDataChange: (name: string, value: any) => void): JSX.Element {
        const renderDateTimeInputControl = () => {
            return <div><DatePicker
                selected={getPropertyValueByString(rowData, column.name)}
                onChange={(date: any) => onRowDataChange(column.name, date)}
            />
            </div>
        }

        let label = column.name

        return <div key={column.name} className="cm-crud-modal-input-holder">
            <Form.Group style={{ marginBottom: 5 }}>
                <Form.Label htmlFor={column.name} style={{ marginBottom: 0, color: '#909090' }} >
                    {label}
                </Form.Label>
                {renderDateTimeInputControl()}
            </Form.Group>
        </div>
    }
}
