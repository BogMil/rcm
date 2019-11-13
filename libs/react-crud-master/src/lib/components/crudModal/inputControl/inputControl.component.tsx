import React, { } from "react";
import {
    Form,
} from "react-bootstrap";
import { InputControlOwnProps } from "./inputControl.types";
import { InputControlTypeNames } from '../../../constants/InputControlTypeNames';
import { Bool } from '../../../types/inputControlTypes/boolInputControlType'
import { getPropertyValueByString } from '../../../utils/objectHelper';
import { ColumnTypeNames } from '../../../constants/columnTypeNames';
import ForeignKeyControlComponent from './foreignKey.component'
import BoolInputControlComponent from './bool.component';
import { None } from '../../../types/inputControlTypes/noneInputControlType';
import { PrimaryKey } from '../../../types/columnTypes/primaryKeyColumnType';
import { StringInputControlType, TextBox, TextArea } from '../../../types/inputControlTypes/stringInputControlType';

export default function InputControlComponent2(props: InputControlOwnProps) {

    const renderInputControl = () => {
        if (props.isInCreateMode) {
            let createMode = props.column.createMode;
            let label = props.column.name
            let type = props.column.columnType.createMode.InputControl.inputType
            let isCustom = false;

            if (createMode != null) {
                type = props.column.createMode.InputControl.inputType
                isCustom = true;
                // return <>custom create mode is not nul</>
            }


            if (props.column.columnType.name == ColumnTypeNames.FOREIGN_KEY) {
                return <ForeignKeyControlComponent onRowDataChange={props.onRowDataChange} column={props.column} rowData={props.rowData} />
            }

            switch (type) {

                case InputControlTypeNames.STRING: case InputControlTypeNames.INTEGER: case InputControlTypeNames.DECIMAL:

                    let stringColumnType = props.column.columnType.createMode.InputControl as StringInputControlType
                    if (isCustom)
                        stringColumnType = props.column.createMode.InputControl as StringInputControlType


                    if (stringColumnType.presentationType instanceof TextBox)
                        return <div key={props.column.name} className="cm-crud-modal-input-holder">
                            <Form.Group style={{ marginBottom: 5 }}>
                                <Form.Label htmlFor={props.column.name} style={{ marginBottom: 0 }} >
                                    {label}
                                </Form.Label>
                                <Form.Control
                                    onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                                    type="text"
                                    placeholder={props.column.name}
                                    className="cm-crud-modal-text-input"
                                    value={getPropertyValueByString(props.rowData, props.column.name)}
                                />
                            </Form.Group>
                        </div>

                    if (stringColumnType.presentationType instanceof TextArea)
                        return <div key={props.column.name} className="cm-crud-modal-input-holder">
                            <Form.Group style={{ marginBottom: 5 }}>
                                <Form.Label htmlFor={props.column.name} style={{ marginBottom: 0 }} >
                                    {label}
                                </Form.Label>
                                <Form.Control
                                    as="textarea" rows={stringColumnType.presentationType.rows}
                                    onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                                    type="text"
                                    placeholder={props.column.name}
                                    className="cm-crud-modal-text-input"
                                    style={{ resize: stringColumnType.presentationType.resizable == true ? '' : 'none' }}
                                    value={getPropertyValueByString(props.rowData, props.column.name)}
                                />
                            </Form.Group>
                        </div>


                case InputControlTypeNames.BOOL:
                    return <div key={props.column.name} className="cm-crud-modal-input-holder">
                        <Form.Group style={{ marginBottom: 5 }}>
                            <Form.Label htmlFor={props.column.name} style={{ marginBottom: 0 }} >
                                {label}
                            </Form.Label>
                            <BoolInputControlComponent
                                column={props.column}
                                onRowDataChange={props.onRowDataChange}
                                rowData={props.rowData}
                            />
                        </Form.Group>
                    </div>

                case InputControlTypeNames.NONE:
                    return null;


                default:
                    console.error("missing case" + type);
            }
        }
        return (
            <>

                < Form.Control
                    onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                    placeholder={props.column.name}
                    className="cm-crud-modal-text-input"
                    value={getPropertyValueByString(props.rowData, props.column.name)}
                />
            </>
        );
    }


    return renderInputControl();
}