import React, { } from "react";
import {
    Form,
} from "react-bootstrap";
import { InputControlOwnProps } from "./inputControl.types";
import { InputControlTypeNames } from '../../../constants/InputControlTypeNames';
import { getPropertyValueByString } from '../../../utils/objectHelper';
import { ColumnTypeNames } from '../../../constants/columnTypeNames';
import ForeignKeyControlComponent from './foreignKey.component'
import BoolInputControlComponent from './bool.component';
import StringInputControlComponent from './string.component';
import DecimalInputControlComponent from './decimal.component';
import IntegerInputControlComponent from './integer.component';

export default function InputControlComponent(props: InputControlOwnProps) {

    const renderInputControl = () => {
        let type = props.column.InputControl.inputType

        if (props.column.columnType.name == ColumnTypeNames.FOREIGN_KEY) {
            return <ForeignKeyControlComponent
                onRowDataChange={props.onRowDataChange}
                column={props.column}
                rowData={props.rowData}
                isInCreateMode={props.isInCreateMode}
            />
        }
        switch (type) {

            case InputControlTypeNames.STRING:
                return <StringInputControlComponent
                    column={props.column}
                    onRowDataChange={props.onRowDataChange}
                    rowData={props.rowData} />

            case InputControlTypeNames.DECIMAL:
                return <DecimalInputControlComponent
                    column={props.column}
                    onRowDataChange={props.onRowDataChange}
                    rowData={props.rowData} />


            case InputControlTypeNames.BOOL:
                return <BoolInputControlComponent
                    column={props.column}
                    onRowDataChange={props.onRowDataChange}
                    rowData={props.rowData}
                />

            case InputControlTypeNames.INTEGER:
                return <IntegerInputControlComponent
                    column={props.column}
                    onRowDataChange={props.onRowDataChange}
                    rowData={props.rowData}
                />
            case InputControlTypeNames.NONE:
                return null;


            default:
                console.error("missing case" + type);
        }
        // return (
        //     <>

        //         < Form.Control
        //             onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
        //             placeholder={props.column.name}
        //             className="cm-crud-modal-text-input"
        //             value={getPropertyValueByString(props.rowData, props.column.name)}
        //         />
        //     </>
        // );
    }


    return renderInputControl();
}