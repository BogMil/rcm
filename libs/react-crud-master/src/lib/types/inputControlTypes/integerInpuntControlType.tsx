import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import React from 'react'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'
import { IRowData } from '../../components/crudModal/crudModal.types';
import { ColModel } from '../colModel/colModel';
import { Form } from 'react-bootstrap';
import { getPropertyValueByString } from '../../utils/objectHelper';

export interface IntegerConfig extends CommonInputTypeConfigProps { }

export default class IntegerInputControlType implements InputControlType, IntegerConfig {

    controlLabel?: string

    get inputType() { return InputControlTypeNames.INTEGER }

    constructor(config?: Partial<IntegerConfig>) {
        Object.assign(this, config);
    }

    render(rowData: IRowData, column: ColModel, onRowDataChange: (name: string, value: any) => void): JSX.Element {
        const onChange = (name, value) => {
            var patt = new RegExp(/^(|[1-9]\d*)$/);
            var res = patt.test(value);
            if (!res)
                return;
            onRowDataChange(name, value)
        }

        const renderIntegerInputControl = () => {
            return <Form.Control
                onChange={(e: any) => onChange(column.name, e.target.value)}
                // type="number"
                placeholder={column.name}
                className="cm-crud-modal-text-input cm-input-control"
                value={getPropertyValueByString(rowData, column.name)}
            />
        }

        let label = column.name

        return <div key={column.name} className="cm-crud-modal-input-holder">
            <Form.Group style={{ marginBottom: 5 }}>
                <Form.Label htmlFor={column.name} style={{ marginBottom: 0 }} >
                    {label}
                </Form.Label>
                {renderIntegerInputControl()}
            </Form.Group>
        </div>
    }
}
