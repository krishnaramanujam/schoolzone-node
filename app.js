const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Database Connection
let database = require('./config/database');

//Importing Routers
const authRouters = require('./auth/auth');
// const communicateRouters = require('./modules/communicate/communicate_api');
// const masterRouters = require('./modules/master/master_api');
// const settingRouters = require('./modules/settings/settings_api');

// Assigning Express to app
const app = express();

// Enable All CORS Requests
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.use("/api/auth", authRouters);
// app.use("/api/communicate", communicateRouters);
// app.use("/api/master", masterRouters);
// app.use("/api/settings", settingRouters);


module.exports = app;

