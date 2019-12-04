
import React, { } from "react";
import { Form } from "react-bootstrap";
import { ColModel } from '../../../types/colModel/colModel';
import { getPropertyValueByString } from '../../../utils/objectHelper';
import { IRowData } from '../crudModal.types';
import DecimalInputControlType from '../../../types/inputControlTypes/decimalInputControlType';
import './inputControl.css'

export interface DecimalInputControlProps {
    rowData: IRowData,
    column: ColModel,
    onRowDataChange: (name: string, value: any) => void
}

export default function DecimalInputControlComponent(props: DecimalInputControlProps) {

    const renderDecimalInputControl = () => {
        return <Form.Control
            onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
            type="number"
            pattern="[0-9]+([,\.][0-9]+)?" step="0.01"
            placeholder={props.column.name}
            className="cm-crud-modal-text-input cm-input-control"
            value={getPropertyValueByString(props.rowData, props.column.name)}
        />
    }

    let label = props.column.name

    return <div key={props.column.name} className="cm-crud-modal-input-holder">
        <Form.Group style={{ marginBottom: 5 }}>
            <Form.Label htmlFor={props.column.name} style={{ marginBottom: 0, color: '#909090' }} >
                {label}
            </Form.Label>
            {renderDecimalInputControl()}
        </Form.Group>
    </div>
}