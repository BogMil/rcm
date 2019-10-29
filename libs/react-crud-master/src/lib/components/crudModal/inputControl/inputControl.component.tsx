import React, { Component } from "react";
import {
    Modal,
    Button,
    Form,
} from "react-bootstrap";

import { InputControlState, initialState, InputControlProps } from "./inputControl.types";
import { InputControlTypeNames } from '../../../constants/InputControlTypeNames';
import { ColModel } from '../../../types/colModel';
import { InputControlTypes, SwitchBoolPresentationType, CheckboxBoolPresentationType } from '../../../types/inputControlTypesTest';
import { Bool } from '../../../types/inputControlTypes/bool'
import { SelectBoolPresentationType } from '../../../types/inputControlTypesTest'
import { getPropertyValueByString } from '../../../utils/objectHelper';

export default class InputControlComponent extends Component<InputControlProps, InputControlState>{
    constructor(props: InputControlProps) {
        super(props);
        this.state = initialState();
    }

    componentDidMount = () => {

    }
    decideInputType = (colType: string): string => {
        switch (colType) {
            case InputControlTypeNames.STRING:
                return 'text';

            case InputControlTypeNames.INTEGER: case InputControlTypeNames.DECIMAL:
                return 'number';
        }
    }

    renderInputControl = () => {
        if (this.props.isInCreateMode) {
            let type = this.props.column.createMode.InputControl.inputType

            switch (type) {
                case InputControlTypeNames.STRING: case InputControlTypeNames.INTEGER: case InputControlTypeNames.DECIMAL:
                    return (
                        <>
                            < Form.Control
                                onChange={(e: any) => this.props.onRowDataChange(this.props.column.name, e.target.value)}
                                type={this.decideInputType(this.props.column.createMode.InputControl.inputType)}
                                placeholder={this.props.column.name}
                                className="cm-crud-modal-text-input"
                                value={getPropertyValueByString(this.props.rowData, this.props.column.name)}
                            />
                        </>
                    );
                case InputControlTypeNames.BOOL:
                    let Bool = this.props.column.createMode.InputControl as Bool;

                    if (Bool.presentationType instanceof SelectBoolPresentationType) {
                        let selectOptions = Bool.presentationType as SelectBoolPresentationType;
                        return (
                            <Form.Control
                                onChange={(e: any) => this.props.onRowDataChange(this.props.column.name, e.target.value)}
                                value={getPropertyValueByString(this.props.rowData, this.props.column.name)}
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
                                onChange={(e: any) => this.props.onRowDataChange(this.props.column.name, e.target.value)}
                                custom
                                disabled={Bool.disabled}
                                type={'switch'}
                                id={`custom-1`}
                                label={options.label}
                                className="cm-crud-modal-text-input"
                                defaultChecked={Bool.default}
                                value={getPropertyValueByString(this.props.rowData, this.props.column.name)}
                            />
                        );
                    }
                    if (Bool.presentationType instanceof CheckboxBoolPresentationType) {
                        let options = Bool.presentationType as CheckboxBoolPresentationType;

                        return (
                            <Form.Check
                                onChange={(e: any) => this.props.onRowDataChange(this.props.column.name, e.target.value)}
                                custom
                                disabled={Bool.disabled}
                                type={'checkbox'}
                                id={`custom-1`}
                                label={options.label}
                                className="cm-crud-modal-text-input"
                                defaultChecked={Bool.default}
                                value={getPropertyValueByString(this.props.rowData, this.props.column.name)}
                            />
                        );
                    }


                default:
                    return (
                        <>

                            < Form.Control
                                onChange={(e: any) => this.props.onRowDataChange(this.props.column.name, e.target.value)}
                                placeholder={this.props.column.name}
                                className="cm-crud-modal-text-input"
                                value={getPropertyValueByString(this.props.rowData, this.props.column.name)}
                            />
                        </>
                    );
            }
        }
        return (
            <>

                < Form.Control
                    onChange={(e: any) => this.props.onRowDataChange(this.props.column.name, e.target.value)}
                    placeholder={this.props.column.name}
                    className="cm-crud-modal-text-input"
                    value={getPropertyValueByString(this.props.rowData, this.props.column.name)}
                />
            </>
        );
    }

    render = () => {
        return (
            <div key={this.props.column.name} className="cm-crud-modal-input-holder">
                <Form.Group style={{ marginBottom: 5 }}>
                    <Form.Label htmlFor={this.props.column.name} style={{ marginBottom: 0 }} >
                        {this.props.column.name}
                    </Form.Label>
                    {this.renderInputControl()}
                </Form.Group>
            </div>
        );
    }


}