import { InputControlOwnProps } from "./inputControl.types";
import './inputControl.css'

export default function InputControlComponent(props: InputControlOwnProps) {

    return props.column.InputControl.render(props.rowData, props.column, props.onRowDataChange);
}