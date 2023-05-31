const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//Import Routes
const projectRoutes = require("./routes/project");
const authRoutes = require("./routes/auth");

const app = express();

//Swagger Dependencies
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');

//Setup Swagger
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDefinition))

//const { verifyToken } = require("./validation");

// ENV File
require("dotenv-flow").config();

// parse request of content-type JSON
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect(
    process.env.DBHOST, 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB:" + error));
mongoose.connection.once('open', () => console.log('Connected succesfully to MongoDB'));

// CORS
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API Routes Definition

//Welcome Route
app.get("/api/welcome", (req, res) => {
    res.status(200).send({message: "Welcome to the REST Project Management API"});
})

app.use("/api/project", projectRoutes);
app.use("/api/user", authRoutes);

// CREATE PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT ,function() {
    console.log("server is running on port" + PORT);
})

module.exports = app;

// // error handler
// app.use(function(err, req, res, next) {
//     console.error(err.message);
//     if (!err.statusCode) err.statusCode = 500;
//     res.status(err.statusCode).send(err.message)
// })