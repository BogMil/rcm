import React, { useEffect, useState } from "react";
import {
    Form,
} from "react-bootstrap";
import { ColModel } from '../../../types/colModel/colModel';
import { getPropertyValueByString } from '../../../utils/objectHelper';
import { ColumnTypeNames } from '../../../constants/columnTypeNames';
import { ForeignKey } from '../../../types/columnTypes/foreignKeyColumnType';
import axios from 'axios';
import { IRowData } from '../crudModal.types';
import { InputControlTypeNames } from '../../../constants/InputControlTypeNames';
import './inputControl.css'

export interface foreignKeyProps {
    rowData: IRowData,
    column: ColModel,
    isInCreateMode: boolean,
    onRowDataChange: (name: string, value: any) => void
}

export default function foreignKeyControlComponent(props: foreignKeyProps) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        var dependency = (props.column.columnType as ForeignKey).dependencies[0]
        let dependecies = [];

        dependecies.unshift(props.column.columnType)
        dependecies.unshift(dependency)
        while (dependency.dependency != null) {
            dependecies.unshift(dependency.dependency)
            dependency = dependency.dependency;
        }

        console.log(dependecies)


        if (props.column.columnType.name == ColumnTypeNames.FOREIGN_KEY) {
            var optionsUrl = (props.column.columnType as ForeignKey).optionsUrl;
            axios({ url: optionsUrl, method: 'GET' })
                .then(r => {
                    setOptions(r.data);
                })
        }

    }, []);

    let inputControlType = props.column.InputControl;
    if (inputControlType.inputType == InputControlTypeNames.SELECT) {

        var htmlOptions = [];
        options.forEach(o => htmlOptions.push(<option key={o.key} value={o.key}>{o.value}</option>))
        let label = (props.column.columnType as ForeignKey).valueColumnName

        return (
            <div>
                <div key={props.column.name} className="cm-crud-modal-input-holder">
                    <Form.Group style={{ marginBottom: 5 }}>
                        <Form.Label htmlFor={props.column.name} style={{ marginBottom: 0 }} >
                            {label}
                        </Form.Label>

                        < Form.Control
                            as="select"
                            onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                            className="cm-crud-modal-text-input cm-input-control"
                            value={getPropertyValueByString(props.rowData, props.column.name)}
                        >
                            {htmlOptions}
                        </Form.Control>
                    </Form.Group>
                </div>
            </div>
        );
    }
}