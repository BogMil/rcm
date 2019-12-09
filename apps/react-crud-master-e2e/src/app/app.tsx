import React, { Component } from 'react';

import { ReactCrudMaster, ColModel, InputControlTypes } from '@react-crud-master-workspace/react-crud-master';
import { UserConfig } from 'libs/react-crud-master/src/lib/types/userConfig';
import { ForeignKey, ForeignKeyDependency } from 'libs/react-crud-master/src/lib/types/columnTypes/foreignKeyColumnType';
import { PrimaryKey } from 'libs/react-crud-master/src/lib/types/columnTypes/primaryKeyColumnType';
import { Bool } from 'libs/react-crud-master/src/lib/types/columnTypes/boolColumnType';
import Decimal from 'libs/react-crud-master/src/lib/types/columnTypes/decimalColumnType';
import { StringColumnType } from 'libs/react-crud-master/src/lib/types/columnTypes/stringColumnType';
import { StringInputControlType, TextArea } from 'libs/react-crud-master/src/lib/types/inputControlTypes/stringInputControlType';
import { ColumnTypeNames } from 'libs/react-crud-master/src/lib/constants/columnTypeNames';
import IntegerColumnType from 'libs/react-crud-master/src/lib/types/columnTypes/integerColumnType';
// import 'react-crud-master/css/bundle.css'

export class App extends Component {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./${fileName}.${style} file.
   */

  data: any;
  data2: any;
  colModels: ColModel[];
  colModels2: ColModel[];
  colModels3: ColModel[];


  constructor(props) {
    super(props);



    this.colModels3 = [
      new ColModel({ name: 'id', width: 150, columnType: new PrimaryKey(), columnPosition: 1 }),
      new ColModel({ name: 'name', width: 400, InputControl: InputControlTypes.String(), columnPosition: 2 }),
      new ColModel({
        name: 'mail',
        width: 300,
        InputControl: InputControlTypes.String({ presentationType: new TextArea({ rows: 3 }) }),
        columnPosition: 3
      }),
      new ColModel({
        name: 'dtoCityId',
        width: 150,
        columnType: new ForeignKey({
          valueColumnName: 'city.name',
          optionsUrl: 'https://localhost:44368/api/school/OptionsForForeignKey?fkName=DtoCityId&template={name} {postalCode}',
          dependencies: [
            new ForeignKeyDependency({
              optionsUrl: 'https://localhost:44368/api/City/OptionsForForeignKey?fkName=regionId&template={name}',
              dependency: new ForeignKeyDependency({ optionsUrl: 'region' })
            })
          ]
        })
      }),
      new ColModel({
        name: 'city.name',
        label: 'city',
        width: 160,
        InputControl: InputControlTypes.String(),
        columnPosition: 4
      }),
      new ColModel({ name: 'nekiInt', width: 150, columnType: new IntegerColumnType() }),
      new ColModel({ name: 'nekiLong', width: 150, columnType: new IntegerColumnType() }),
      new ColModel({ name: 'nekiDecimal', width: 150, columnType: new Decimal() }),
      new ColModel({ name: 'nekiFloat', width: 150, columnType: new Decimal() }),
      new ColModel({ name: 'nekiDouble', width: 150, columnType: new Decimal() }),
      new ColModel({ name: 'nekiBool', width: 150, columnType: new Bool(), InputControl: InputControlTypes.Bool({ presentationType: InputControlTypes.BoolPresentationTypes.SWITCH(), default: true }) }),

    ]
  }



  render = () => {
    let config1: UserConfig = new UserConfig({
      colModels: this.colModels2,
      rows: this.data2
    });

    let config2: UserConfig = new UserConfig({
      colModels: this.colModels3,
      url: "https://localhost:44368/api/school"
    });

    return (
      <>
        <ReactCrudMaster {...config2} />
        <ReactCrudMaster {...config2} />
      </>
    );
  }

};

export default App;
