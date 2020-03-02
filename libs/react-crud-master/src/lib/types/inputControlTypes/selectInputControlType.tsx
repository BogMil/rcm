import { CommonInputTypeConfigProps, InputControlType } from './commonInterfaces'
import { InputControlTypeNames } from '../../constants/InputControlTypeNames'
import React, { useEffect, useState } from "react";
import { ForeignKey } from '../columnTypes/foreignKeyColumnType';
import { ColumnTypeNames } from '../../constants/columnTypeNames';
import axios from 'axios'
import { Form } from 'react-bootstrap';
import { getPropertyValueByString } from '../../utils/objectHelper';

export interface SelectOptions extends CommonInputTypeConfigProps {
  disabled?: boolean,
  default?: boolean,
  options?: [string, string][]
  optionsUrl?: string
}
export class SelectInputControlType implements InputControlType, SelectOptions {

  get inputType() { return InputControlTypeNames.SELECT }
  disabled: boolean = false;
  default: boolean;
  controlLabel: string;
  options?: [string, string][];
  optionsUrl?: string;

  constructor(boolConfig?: Partial<SelectOptions>) {
    Object.assign(this, boolConfig);
  }

  render(rowData: import("../../components/crudModal/crudModal.types").IRowData, column: import("../..").ColModel, onRowDataChange: (name: string, value: any) => void): JSX.Element {
    const [options, setOptions] = useState([]);

    useEffect(() => {
      var dependency = (column.columnType as ForeignKey).dependencies[0]
      let dependecies = [];

      dependecies.unshift(column.columnType)
      dependecies.unshift(dependency)
      while (dependency.dependency != null) {
        dependecies.unshift(dependency.dependency)
        dependency = dependency.dependency;
      }

      if (column.columnType.name == ColumnTypeNames.FOREIGN_KEY) {
        axios({ url: this.optionsUrl, method: 'GET' })
          .then(r => {
            setOptions(r.data);
          })
      }

    }, []);

    let inputControlType = column.InputControl;
    if (inputControlType.inputType == InputControlTypeNames.SELECT) {

      var htmlOptions = [<option key={-1} value={null}>-</option>];
      options.forEach(o => htmlOptions.push(<option key={o.key} value={o.key}>{o.value}</option>))
      let label = (column.columnType as ForeignKey).valueColumnName

      return (
        <div>
          <div key={column.name} className="cm-crud-modal-input-holder">
            <Form.Group style={{ marginBottom: 5 }}>
              <Form.Label htmlFor={column.name} style={{ marginBottom: 0 }} >
                {label}
              </Form.Label>

              < Form.Control
                as="select"
                onChange={(e: any) => onRowDataChange(column.name, e.target.value)}
                className="cm-crud-modal-text-input cm-input-control"
                value={getPropertyValueByString(rowData, column.name)}
              >
                {htmlOptions}
              </Form.Control>
            </Form.Group>
          </div>
        </div>
      );
    }
  }
}
