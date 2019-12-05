
// import React, { } from "react";
// import { Form } from "react-bootstrap";
// import { ColModel } from '../../../types/colModel/colModel';
// import { getPropertyValueByString } from '../../../utils/objectHelper';
// import { IRowData } from '../crudModal.types';
// import DecimalInputControlType from '../../../types/inputControlTypes/decimalInputControlType';
// import './inputControl.css'
// // import { onRowDataChange } from '../crudModal.actions';

// export interface IntegerInputControlProps {
//     rowData: IRowData,
//     column: ColModel,
//     onRowDataChange: (name: string, value: any) => void
// }



// export default function IntegerInputControlComponent(props: IntegerInputControlProps) {

//     const onRowDataChange = (name, value) => {
//         var patt = new RegExp(/^(|[1-9]\d*)$/);
//         var res = patt.test(value);
//         if (!res)
//             return;
//         props.onRowDataChange(name, value)
//     }

//     const renderIntegerInputControl = () => {
//         return <Form.Control
//             onChange={(e: any) => onRowDataChange(props.column.name, e.target.value)}
//             // type="number"
//             placeholder={props.column.name}
//             className="cm-crud-modal-text-input cm-input-control"
//             value={getPropertyValueByString(props.rowData, props.column.name)}
//         />
//     }

//     let label = props.column.name

//     return <div key={props.column.name} className="cm-crud-modal-input-holder">
//         <Form.Group style={{ marginBottom: 5 }}>
//             <Form.Label htmlFor={props.column.name} style={{ marginBottom: 0 }} >
//                 {label}
//             </Form.Label>
//             {renderIntegerInputControl()}
//         </Form.Group>
//     </div>
// }