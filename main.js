var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

var Author = require("./models/author");
var User = require("./models/user");

var author = require("./services/authorService");
var user = require("./services/userService");

var app = express();

app.use(bodyParser.json());

//Against CORS Errors , adding CORS middleware
app.use(cors())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

mongoose
  .connect(
    "mongodb+srv://deniz:12345@teacherbase.juh80dz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to db!"))
  .catch((error) => console.log(error));

app.use('/author',author.router)
app.use('/user',user.router)

app.listen(8080);
