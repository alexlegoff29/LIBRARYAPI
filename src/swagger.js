const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const apiEndpointsFiles = ['src/services/members/members-routes.js']

const doc = {
    info: {
        version: "1.0.0",
        title: "LIBRARY API documentation",
        description: "Documentation of Library API",
        termsOfService: "http://swagger.io/terms/",
        contact: {
            email: "contact@library-api.com"
        },
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
    },
    servers: [
        { 
            url: "http://localhost:8080/" 
        }
    ],
    host: "localhost:8080",
    basePath: "/",
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: "authorization",
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header'
        }
    },
    tags: [
        {
            "name": "Auth",
            "description": "Endpoints"
        }
    ],
    definitions: {
        Auth: {
            register: 
                {
                    $email: "john.smith@yopmail.com",
                    $password: "",
                    $Name: "John Smith",
                    phoneNumber: "+33695343070",
                    address: "5 rue de la garenne, 29200 Brest"
                },
            "sign-in" :
                {
                    $email: "john.smith@yopmail.com",
                    $password: ""
                },
            me: 
                {
                    $JWT_SECRET: ""
                },
        },
        Members: {
            $Name: "John Smith",
            $address: "5 rue de la garenne, 29200 Brest",
            $email: "john.smith@yopmail.com",
            $phoneNumber: "+33695343070",
            $uid: "4S6l8Pn9juB0aaxvKuxZ"
        },
        Books: {
            $Author: "J.K. Rowling",
            $Title: "Harry Potter  and the Sorcerer's Stone"
        },
        Authors: {
            "Date of birth": "31/07/1965",
            "Date of death": "01/01/2000",
            $Name: "J.K. Rowling"
        },
        Genres: {
            $Description: "Literary genre that focuses on fantasy stories, often with elements of magic and the fantastic.",
            $Name: "Fantasy"
        },
        Loans: {
            "Book name": "Harry Potter and the Sorcerer's Stone",
            "Due date": '14/01/2022',
            "Loan date": "01/01/2022",
            "Member name": "John Smith"
        },
        Reservations: {
            "Book title": "Harry Potter and the Sorcerer's Stone",
            "Member name": "John Smith",
            "Reservation date": "01/01/2022"
        }
    }
}

swaggerAutogen(outputFile, apiEndpointsFiles, doc).then(() => {
    // -- For auto generating swagger_output.json file
    require('./app.js')
});