var express = require("express");
var Author = require("../models/author");
const user = require("./userService");
var router = express.Router();

router.post("",user.checkAuthenticated, (request, response) => {
  var authorData = request.body;
  var author = new Author(authorData);
  author
    .save()
    .then(() => response.sendStatus(201))
    .catch((error) => console.log(error));
});

router.get("",user.checkAuthenticated, async (request, response) => {
  var authors = await Author.find({}, "-__v");
  response.send(authors);
});

var author = {router}

module.exports = author