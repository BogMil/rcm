import React, { Component } from 'react';

import { ReactCrudMaster, ColModel, InputControlTypes } from '@react-crud-master-workspace/react-crud-master';
import { UserConfig } from 'libs/react-crud-master/src/lib/types/userConfig';
import { ForeignKey } from 'libs/react-crud-master/src/lib/types/columnTypes/foreignKeyColumnType';
import { PrimaryKey } from 'libs/react-crud-master/src/lib/types/columnTypes/primaryKeyColumnType';
import { StringColumnType } from 'libs/react-crud-master/src/lib/types/columnTypes/stringColumnType';
import { StringInputControlType } from 'libs/react-crud-master/src/lib/types/inputControlTypes/stringInputControlType';
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

    this.colModels2 = [
      new ColModel({
        name: 'pkey',
        width: 150,
        // createMode: {
        //   // InputControl: InputControlTypes.String({ presentationType: StringInputControlType.presentaionTypes.TEXTBOX() }),
        // }
      }),
      new ColModel({
        name: 'integer',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.String(),
        }
      }),
      new ColModel({
        name: 'decimal',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.String(),
        }
      }),
      new ColModel({
        name: 'string',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.String(),
        }
      }),
      new ColModel({
        name: 'bool',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.Bool({
            // presentationType: InputControlTypes.BoolPresentationTypes.SWITCH({ label: 'testera' }),
            presentationType: InputControlTypes.BoolPresentationTypes.SELECT({ trueLabel: 'true label a', falseLabel: 'false lab', trueValue: 1, falseValue: 0, default: false }),
            disabled: false,
            default: true
          }),
          beforeChange: () => console.log('aaaaaaaaaaaaaaaa'),
          afterChange: () => console.log('afterChange')
        }

      }),
      new ColModel({
        name: 'datetime',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.String(),
        }
      }),
      new ColModel({
        name: 'fkey',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.String(),
        }
      }),
      new ColModel({
        name: 'select',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.String(),
        }
      }),
    ]

    this.data2 = [
      {
        pkey: 1,
        integer: 1,
        decimal: 1.2,
        string: "someString",
        bool: true,
        datetime: "12345",
        fkey: "mail@gmail.com",
        select: "mail@gmail.com"
      },

      {
        pkey: 2,
        integer: 2,
        decimal: 2.2,
        string: "someString",
        bool: true,
        datetime: "12345",
        fkey: "mail@gmail.com",
        select: "mail@gmail.com"
      },
      {
        pkey: 3,
        integer: 3,
        decimal: 1.0002,
        string: "someString",
        bool: true,
        datetime: "12345",
        fkey: "mail@gmail.com",
        select: "mail@gmail.com"
      },
      {
        pkey: 4,
        integer: 14,
        decimal: 14.2,
        string: "someString",
        bool: true,
        datetime: "12345",
        fkey: "mail@gmail.com",
        select: "mail@gmail.com"
      },
    ]

    this.colModels3 = [
      new ColModel({
        name: 'id',
        width: 150,
        columnType: new PrimaryKey()
      }),
      new ColModel({
        name: 'name',
        width: 400,
      }),
      new ColModel({
        name: 'mail',
        width: 300,
        createMode: {
          InputControl: InputControlTypes.String({
            presentationType: StringInputControlType.presentaionTypes.TEXTAREA()
          })
        }
      }),
      new ColModel({
        name: 'cityId',
        width: 150,
        columnType: new ForeignKey({
          // show: true,
          valueColumnName: 'city.name',
          optionsUrl: 'https://localhost:44368/api/school/OptionsForForeignKey?fkName=DtoCityId&template={name}'
        })
      }),
      new ColModel({
        name: 'city.name',
        label: 'city',
        width: 160,
        createMode: {
          InputControl: InputControlTypes.String(),
        }
      }),
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
        <div>
          <ReactCrudMaster {...config1} />
        </div>
        <ReactCrudMaster {...config2} />
      </>
    );
  }

};

export default App;
