import React, { Component } from 'react';

import { ReactCrudMaster, ColModel, InputControlTypes } from '@react-crud-master-workspace/react-crud-master';
import { UserConfig } from 'libs/react-crud-master/src/lib/types/userConfig';
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


    // this.data = [
    //   {
    //     Id: 1,
    //     FirstName:
    //       "Milan Milan Milan Milan Milan Milan Milan Milan Milan Milan Milan ",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 2,

    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 3,
    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 4,
    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 5,
    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 6,
    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 7,
    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 8,
    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 9,
    //     FirstName: "Milan BOgdanovic BOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovic",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 10,
    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 11,
    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 12,
    //     FirstName: "Milan BOgdanovic BOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovic",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 13,
    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 14,
    //     FirstName: "Milan",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   },
    //   {
    //     Id: 15,
    //     FirstName: "Milan BOgdanovic BOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovic",
    //     LastName: "BOgdanovic",
    //     Username: "mbogda",
    //     Contact: "12345",
    //     Email: "mail@gmail.com"
    //   }
    // ];

    // this.colModels = [
    //   new ColModel({
    //     name: "Id",
    //     label: "Id",
    //     width: 150,
    //     minWidth: 150,
    //   }),

    //   new ColModel({
    //     name: "FirstName",
    //     label: "first name",
    //     width: 200
    //   }),
    //   new ColModel({
    //     name: "LastName",
    //     label: "last name",
    //     width: 400,
    //     // minWidth: 150
    //   }),
    //   new ColModel({
    //     name: "Username",
    //     label: "Username",
    //     width: 150,
    //     minWidth: 150,
    //     columnPosition: 200

    //   }),
    //   new ColModel({
    //     name: "Contact",
    //     label: "Contact",
    //     width: 150,
    //     // minWidth: 150
    //   }),
    // ];

    this.colModels2 = [
      new ColModel({
        name: 'pkey',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.string(),
        }
      }),
      new ColModel({
        name: 'integer',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.string(),
        }
      }),
      new ColModel({
        name: 'decimal',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.string(),
        }
      }),
      new ColModel({
        name: 'string',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.string(),
        }
      }),
      new ColModel({
        name: 'bool',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.Bool({
            presentationType: InputControlTypes.BoolPresentationTypes.SWITCH({ label: 'testera' }),
            // presentationType: InputControlTypes.BoolPresentationTypes.SELECT({ trueLabel: 'true label a', falseLabel: 'false lab', trueValue: 1, falseValue: 0, default: false }),
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
          InputControl: InputControlTypes.string(),
        }
      }),
      new ColModel({
        name: 'fkey',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.string(),
        }
      }),
      new ColModel({
        name: 'select',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.string(),
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
        createMode: {
          InputControl: InputControlTypes.string(),
        }
      }),
      new ColModel({
        name: 'name',
        width: 400,
        createMode: {
          InputControl: InputControlTypes.string(),
        }
      }),
      new ColModel({
        name: 'mail',
        width: 300,
        createMode: {
          InputControl: InputControlTypes.string(),
        }
      }),
      new ColModel({
        name: 'cityId',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.string(),
        }
      }),
      new ColModel({
        name: 'city.name',
        width: 150,
        createMode: {
          InputControl: InputControlTypes.string(),
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
        <ReactCrudMaster {...config1} />
        <ReactCrudMaster {...config2} />
      </>
    );
  }

};

export default App;
