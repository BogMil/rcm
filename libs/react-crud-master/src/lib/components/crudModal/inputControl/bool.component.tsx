import React, { } from "react";
import {
    Form,
} from "react-bootstrap";
import { ColModel } from '../../../types/colModel/colModel';
import { Bool, SelectBoolPresentationType, SwitchBoolPresentationType, CheckboxBoolPresentationType } from '../../../types/inputControlTypes/boolInputControlType'
import { getPropertyValueByString } from '../../../utils/objectHelper';
import { IRowData } from '../crudModal.types';

export interface BoolInputControlProps {
    rowData: IRowData,
    column: ColModel,
    onRowDataChange: (name: string, value: any) => void
}

export default function BoolInputControlComponent(props: BoolInputControlProps) {

    let bool = props.column.createMode.InputControl as Bool;
    if (bool.presentationType instanceof SelectBoolPresentationType) {
        let selectOptions = bool.presentationType as SelectBoolPresentationType;
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

    if (bool.presentationType instanceof SwitchBoolPresentationType) {
        let options = bool.presentationType as SwitchBoolPresentationType;

        return (
            <Form.Check
                onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                custom
                disabled={bool.disabled}
                type={'switch'}
                label={options.label}
                className="cm-crud-modal-text-input"
                defaultChecked={bool.default}
                value={getPropertyValueByString(props.rowData, props.column.name)}
            />
        );
    }

    if (bool.presentationType instanceof CheckboxBoolPresentationType) {
        let options = bool.presentationType as CheckboxBoolPresentationType;

        return (
            <Form.Check
                onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                custom
                disabled={bool.disabled}
                type={'checkbox'}
                label={options.label}
                className="cm-crud-modal-text-input"
                defaultChecked={bool.default}
                value={getPropertyValueByString(props.rowData, props.column.name)}
            />
        );
    }
}