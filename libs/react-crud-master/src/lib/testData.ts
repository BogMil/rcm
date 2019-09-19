import { ColModel } from './types/colModel';

export const data = () => [
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


];

export const colModels = (): ColModel[] => [
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