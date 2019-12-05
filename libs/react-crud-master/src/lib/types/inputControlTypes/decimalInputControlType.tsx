import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import React from 'react'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'
import { Form } from 'react-bootstrap';
import { getPropertyValueByString } from '../../utils/objectHelper';

export interface DecimalConfig extends CommonInputTypeConfigProps { }

export default class DecimalInputControlType implements InputControlType, DecimalConfig {

    controlLabel?: string

    get inputType() { return InputControlTypeNames.DECIMAL }

    constructor(config?: Partial<DecimalConfig>) {
        Object.assign(this, config);
    }

    render(rowData: import("../../components/crudModal/crudModal.types").IRowData, column: import("../..").ColModel, onRowDataChange: (name: string, value: any) => void): JSX.Element {
        const renderDecimalInputControl = () => {
            return <Form.Control
                onChange={(e: any) => onRowDataChange(column.name, e.target.value)}
                type="number"
                pattern="[0-9]+([,\.][0-9]+)?" step="0.01"
                placeholder={column.name}
                className="cm-crud-modal-text-input cm-input-control"
                value={getPropertyValueByString(rowData, column.name)}
            />
        }

        let label = column.name

        return <div key={column.name} className="cm-crud-modal-input-holder">
            <Form.Group style={{ marginBottom: 5 }}>
                <Form.Label htmlFor={column.name} style={{ marginBottom: 0, color: '#909090' }} >
                    {label}
                </Form.Label>
                {renderDecimalInputControl()}
            </Form.Group>
        </div>
    }
}
