import React, { Component } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import { useSelect } from 'react-redux'
import { InputControlState, initialState, InputControlProps, InputControlOwnProps } from "./inputControl.types";
import { InputControlTypeNames } from '../../../constants/InputControlTypeNames';
import { ColModel } from '../../../types/colModel/colModel';
import { InputControlTypes, SwitchBoolPresentationType, CheckboxBoolPresentationType } from '../../../types/inputControlTypesTest';
import { Bool } from '../../../types/inputControlTypes/bool'
import { SelectBoolPresentationType } from '../../../types/inputControlTypesTest'
import { getPropertyValueByString } from '../../../utils/objectHelper';
import { ColumnTypeNames } from '../../../constants/columnTypeNames';
import { ForeignKey } from '../../../types/columnTypes/foreignKey';

export default function InputControlComponent2(props: InputControlOwnProps) {

    const decideInputType = (colType: string): string => {
        switch (colType) {
            case InputControlTypeNames.STRING:
                return 'text';

            case InputControlTypeNames.INTEGER: case InputControlTypeNames.DECIMAL:
                return 'number';
        }
    }

    const renderInputControl = () => {
        if (props.isInCreateMode) {
            let type = props.column.createMode.InputControl.inputType

            if (props.column.columnType.name == ColumnTypeNames.FOREIGN_KEY) {
                return (
                    <>
                        < Form.Control
                            as="select"
                            onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                            // type={this.decideInputType(props.column.createMode.InputControl.inputType)}
                            // placeholder={props.column.name}
                            className="cm-crud-modal-text-input"
                            value={getPropertyValueByString(props.rowData, props.column.name)}
                        >
                            {(props.column.columnType as ForeignKey).options.map(o => <option key={o[0]} value={o[0]}>{o[1]}</option>)}

                        </Form.Control>
                    </>
                );
            }

            switch (type) {
                case InputControlTypeNames.STRING: case InputControlTypeNames.INTEGER: case InputControlTypeNames.DECIMAL:
                    return (
                        <>
                            < Form.Control
                                onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                                type={decideInputType(props.column.createMode.InputControl.inputType)}
                                placeholder={props.column.name}
                                className="cm-crud-modal-text-input"
                                value={getPropertyValueByString(props.rowData, props.column.name)}
                            />
                        </>
                    );
                case InputControlTypeNames.BOOL:
                    let Bool = props.column.createMode.InputControl as Bool;

                    if (Bool.presentationType instanceof SelectBoolPresentationType) {
                        let selectOptions = Bool.presentationType as SelectBoolPresentationType;
                        return (
                            <Form.Control
                                onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                                value={getPropertyValueByString(props.rowData, props.column.name)}
                                defaultValue={selectOptions.default ? selectOptions.trueValue : selectOptions.falseValue}
                                as="select">
                                <option defaultChecked value={selectOptions.trueValue}>{selectOptions.trueLabel}</option>
                                <option value={selectOptions.falseValue}>{selectOptions.falseLabel}</option>
                            </Form.Control>
                        );

                    }

                    if (Bool.presentationType instanceof SwitchBoolPresentationType) {
                        let options = Bool.presentationType as SwitchBoolPresentationType;

                        return (
                            <Form.Check
                                onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                                custom
                                disabled={Bool.disabled}
                                type={'switch'}
                                id={`custom-1`}
                                label={options.label}
                                className="cm-crud-modal-text-input"
                                defaultChecked={Bool.default}
                                value={getPropertyValueByString(props.rowData, props.column.name)}
                            />
                        );
                    }
                    if (Bool.presentationType instanceof CheckboxBoolPresentationType) {
                        let options = Bool.presentationType as CheckboxBoolPresentationType;

                        return (
                            <Form.Check
                                onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                                custom
                                disabled={Bool.disabled}
                                type={'checkbox'}
                                id={`custom-1`}
                                label={options.label}
                                className="cm-crud-modal-text-input"
                                defaultChecked={Bool.default}
                                value={getPropertyValueByString(props.rowData, props.column.name)}
                            />
                        );
                    }


                default:
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

    let label = props.column.name

    return (
        <div key={props.column.name} className="cm-crud-modal-input-holder">
            <Form.Group style={{ marginBottom: 5 }}>
                <Form.Label htmlFor={props.column.name} style={{ marginBottom: 0 }} >
                    {label}
                </Form.Label>
                {renderInputControl()}
            </Form.Group>
        </div>
    );
}