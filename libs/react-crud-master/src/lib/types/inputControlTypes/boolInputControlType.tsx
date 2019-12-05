import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'
import React from 'react'
// import BoolInputControlComponent from '../../components/crudModal/inputControl/bool.component'
import { IRowData } from '../../components/crudModal/crudModal.types'
import { ColModel } from '../colModel/colModel'
import { AppState } from '../../rootReducer'
import Form from 'react-bootstrap/Form'
import { getPropertyValueByString } from '../../utils/objectHelper'
import { useSelector } from "react-redux";

export interface BoolOptions extends CommonInputTypeConfigProps {
    presentationType: SelectBoolPresentationType | SwitchBoolPresentationType | CheckboxBoolPresentationType,
    disabled: boolean,
    default: boolean
}
export class Bool implements InputControlType, BoolOptions {
    get inputType() { return InputControlTypeNames.BOOL }
    public presentationType: SelectBoolPresentationType | SwitchBoolPresentationType | CheckboxBoolPresentationType = new CheckboxBoolPresentationType()
    public disabled: boolean
    public default: boolean
    public controlLabel: string

    /**
     * @constructor
     * @param  {String} presentationType - switch or checkbox
     */
    constructor(boolConfig?: Partial<BoolOptions>) {
        Object.assign(this, boolConfig);
    }

    render = (
        rowData: IRowData,
        column: ColModel,
        onRowDataChange: (name: string, value: any) => void
    ) => {
        const RCMID = useSelector((state: AppState) => {
            return state.reactCrudMaster.RCMID
        });

        const renderBoolInputControl = () => {
            let bool = column.InputControl as Bool;
            if (bool.presentationType instanceof SelectBoolPresentationType) {
                let selectOptions = bool.presentationType as SelectBoolPresentationType;
                return (
                    <Form.Control
                        onChange={(e: any) => onRowDataChange(column.name, e.target.value)}
                        value={getPropertyValueByString(rowData, column.name)}
                        id={`${RCMID}-${column.name}`}
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
                        onChange={(e: any) => onRowDataChange(column.name, e.target.value)}
                        custom
                        disabled={bool.disabled}
                        type={'switch'}
                        id={`${RCMID}-${column.name}`}
                        label={options.label}
                        className="cm-crud-modal-text-input"
                        defaultChecked={bool.default}
                        value={getPropertyValueByString(rowData, column.name)}
                    />
                );
            }

            if (bool.presentationType instanceof CheckboxBoolPresentationType) {
                let options = bool.presentationType as CheckboxBoolPresentationType;

                return (
                    <Form.Check
                        onChange={(e: any) => onRowDataChange(column.name, e.target.value)}
                        custom
                        disabled={bool.disabled}
                        type={'checkbox'}
                        id={`${RCMID}-${column.name}`}
                        label={options.label}
                        className="cm-crud-modal-text-input cm-input-control"
                        defaultChecked={bool.default}
                        value={getPropertyValueByString(rowData, column.name)}
                    />
                );
            }
        }
        let label = column.name
        return <div key={column.name} className="cm-crud-modal-input-holder">
            <Form.Group style={{ marginBottom: 5 }}>
                <Form.Label htmlFor={column.name} style={{ marginBottom: 0 }} >
                    {label}
                </Form.Label>
                {renderBoolInputControl()}
            </Form.Group>
        </div>
    }

    // return <BoolInputControlComponent rowData={rowData} column={column} onRowDataChange={onRowDataChange} />
}


export interface CheckSwitchBoolPresentationTypeOptions {
    label: string
}
export class CheckboxSwitchBoolPresentationType implements CheckSwitchBoolPresentationTypeOptions {
    constructor(options?: Partial<CheckSwitchBoolPresentationTypeOptions>) {
        Object.assign(this, options)
    }
    label: string = ''
}

export interface CheckboxBoolPresentationTypeOptions extends CheckSwitchBoolPresentationTypeOptions { }
export class CheckboxBoolPresentationType extends CheckboxSwitchBoolPresentationType {
    constructor(options?: Partial<CheckboxBoolPresentationTypeOptions>) {
        super(options)
    }
}

export interface SwitchBoolPresentationTypeOptions extends CheckSwitchBoolPresentationTypeOptions { }
export class SwitchBoolPresentationType extends CheckboxSwitchBoolPresentationType {
    constructor(options?: Partial<SwitchBoolPresentationTypeOptions>) {
        super(options)
    }
}

export class SelectBoolPresentationType {
    constructor(init?: Partial<SelectBoolPresentationType>) {
        Object.assign(this, init)
    }
    trueLabel: string = 'true'
    trueValue: any = true
    falseLabel: string = 'false'
    falseValue: any = false
    default: boolean = true
}