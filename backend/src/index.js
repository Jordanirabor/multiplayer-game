//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const Pusher = require("pusher");


// define the Express app
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));

let pusher = new Pusher({
    appId: "527681",
    key: "23919cee3b1111731271",
    secret: "2f8af21b174ac69b928f",
    cluster: "eu"
});

let username = "";

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://jordan-auth0.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: '1amurNx2yOiEiW6xfkJHDRlyIoGdQ4IX',
    issuer: `https://jordan-auth0.auth0.com/`,
    algorithms: ['RS256']
});

app.post("/register", checkJwt, (req, res) => {
    username = req.body.name
    res.status(200).send();
});

app.post("/pusher/auth", (req, res) => {
    let socketId = req.body.socket_id;
    let channel = req.body.channel_name;
    let presenceData = {
        user_id: username
    };
    let auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

// start the server
app.listen(5000, () => {
    console.log('listening on port 5000');
});