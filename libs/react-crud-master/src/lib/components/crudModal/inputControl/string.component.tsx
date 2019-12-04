import React, { } from "react";
import { Form } from "react-bootstrap";
import { ColModel } from '../../../types/colModel/colModel';
import { getPropertyValueByString } from '../../../utils/objectHelper';
import { IRowData } from '../crudModal.types';
import { StringInputControlType, TextBox, TextArea } from '../../../types/inputControlTypes/stringInputControlType';
import './inputControl.css'

export interface BoolInputControlProps {
    rowData: IRowData,
    column: ColModel,
    onRowDataChange: (name: string, value: any) => void
}

export default function StringInputControlComponent(props: BoolInputControlProps) {

    const renderStringInputControl = () => {
        let stringColumnType = props.column.InputControl as StringInputControlType

        if (stringColumnType.presentationType instanceof TextBox)
            return <Form.Control
                onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                type="text"
                placeholder={props.column.name}
                className="cm-crud-modal-text-input cm-input-control"
                value={getPropertyValueByString(props.rowData, props.column.name)}
            />

        if (stringColumnType.presentationType instanceof TextArea)
            return <Form.Control
                as="textarea" rows={stringColumnType.presentationType.rows}
                onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                type="text"
                placeholder={props.column.name}
                className="cm-crud-modal-text-input cm-input-control"
                style={{ resize: stringColumnType.presentationType.resizable == true ? '' : 'none' }}
                value={getPropertyValueByString(props.rowData, props.column.name)}
            />
    }

    let label = props.column.name

    return <div key={props.column.name} className="cm-crud-modal-input-holder">
        <Form.Group style={{ marginBottom: 5 }}>
            <Form.Label htmlFor={props.column.name} style={{ marginBottom: 0 }} >
                {label}
            </Form.Label>
            {renderStringInputControl()}
        </Form.Group>
    </div>
}