import { InputControlOwnProps } from "./inputControl.types";
import './inputControl.css'
import React from 'react';
import ForeignKeyControlComponent from './foreignKey.component';
import { ColumnTypeNames } from '../../../constants/columnTypeNames';

export default function InputControlComponent(props: InputControlOwnProps) {

    return props.column.InputControl.render(props.rowData, props.column, props.onRowDataChange);
}