// -- To build our rest API routes, requests and responses
const express = require('express');

// -- To convert json to javascript object
const bodyParser = require('body-parser');

// -- For rest API headers
const cors = require('cors');

// -- To secure our api against common vulnerabilities like xss
const helmet = require('helmet');

// -- To log our express rest api 
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// -- Importing swagger dependency and swagger json file generated
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');

// -- Root service to welcome in our API
app.get('/', (req, res) => {
    res.send({
        "message": "Welcome to our Library API"
    });
});

require("./auth/auth-routes")(app);

// -- Setup swagger in our doc with uri /doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

require("./services/members/members-routes")(app);

require("./services/books/books-routes")(app);

require("./services/authors/authors-routes")(app);

require("./services/genres/genres-routes")(app);

require("./services/loans/loans-routes")(app);

require("./services/reservations/reservations-routes")(app);


let port = process.env.POST || 8080;

app.listen(port, () => {
    console.log("Server started and listening on port 8080");
});