import React, { Component } from 'react';

import { ReactCrudMaster, ColModel } from '@react-crud-master-workspace/react-crud-master';
// import 'react-crud-master/css/bundle.css'

export class App extends Component {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./${fileName}.${style} file.
   */

  data: any;
  colModels: ColModel[];

  constructor(props) {
    super(props);


    this.data = [
      {
        Id: 1,
        FirstName:
          "Milan Milan Milan Milan Milan Milan Milan Milan Milan Milan Milan ",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 2,

        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 3,
        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 4,
        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 5,
        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 6,
        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 7,
        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 8,
        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 9,
        FirstName: "Milan BOgdanovic BOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovic",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 10,
        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 11,
        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 12,
        FirstName: "Milan BOgdanovic BOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovic",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 13,
        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 14,
        FirstName: "Milan",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      },
      {
        Id: 15,
        FirstName: "Milan BOgdanovic BOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovicBOgdanovic BOgdanovic",
        LastName: "BOgdanovic",
        Username: "mbogda",
        Contact: "12345",
        Email: "mail@gmail.com"
      }
    ];

    this.colModels = [
      new ColModel({
        name: "Id",
        label: "Id",
        width: 150,
        minWidth: 150
      }),

      new ColModel({
        name: "FirstName",
        label: "first name",
        width: 200
      }),
      new ColModel({
        name: "LastName",
        label: "last name",
        width: 400,
        // minWidth: 150
      }),
      new ColModel({
        name: "Username",
        label: "Username",
        width: 150,
        minWidth: 150
      }),
      new ColModel({
        name: "Contact",
        label: "Contact",
        width: 150,
        // minWidth: 150
      })
    ];
  }

  render = () => {
    return (
      <ReactCrudMaster data={this.data} colModels={this.colModels} />
    );
  }

};

export default App;
