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

export interface foreignKeyProps {
    rowData: IRowData,
    column: ColModel,
    onRowDataChange: (name: string, value: any) => void
}

export default function foreignKeyControlComponent(props: foreignKeyProps) {
    const [options, setOptions] = useState({});

    useEffect(() => {
        if (props.column.columnType.name == ColumnTypeNames.FOREIGN_KEY) {
            var optionsUrl = (props.column.columnType as ForeignKey).optionsUrl;
            axios({ url: optionsUrl, method: 'GET' })
                .then(r => {
                    setOptions(r.data);
                })
        }

    }, []);

    // let usersInputControlType = props.column.columnType.createMode.InputControl;
    // if (usersInputControlType != null) {
    //     return <div>testera</div>;
    // }

    let inputControlType = props.column.columnType.createMode.InputControl;
    if (inputControlType.inputType == InputControlTypeNames.SELECT) {

        var htmlOptions = [];
        for (var o in options) { htmlOptions.push(<option key={o} value={o}>{options[o]}</option>) }
        return (
            <>
                < Form.Control
                    as="select"
                    onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
                    className="cm-crud-modal-text-input"
                    value={getPropertyValueByString(props.rowData, props.column.name)}
                >
                    {htmlOptions}
                </Form.Control>
            </>
        );
    }

    // if (props.column.columnType.name == ColumnTypeNames.FOREIGN_KEY) {
    //     var htmlOptions = [];
    //     for (var o in options) { htmlOptions.push(<option key={o} value={o}>{options[o]}</option>) }
    //     return (
    //         <>
    //             < Form.Control
    //                 as="select"
    //                 onChange={(e: any) => props.onRowDataChange(props.column.name, e.target.value)}
    //                 className="cm-crud-modal-text-input"
    //                 value={getPropertyValueByString(props.rowData, props.column.name)}
    //             >
    //                 {htmlOptions}
    //             </Form.Control>
    //         </>
    //     );
    // }
}