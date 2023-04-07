var express = require("express");
var User = require("../models/user");
var router = express.Router();
var jwt = require('jwt-simple')

router.post("/register", (request, response) => {
  var userData = request.body;
  var user = new User(userData);

  user
    .save()
    .then(() => response.status(201).send({message:'Created'}))
    .catch((error) => console.log(error));
});

router.post('/login',async(request,response)=>{
    var userData = request.body;
    var user = await User.findOne({email:userData.email})
    if(!user){
        return response.status(401).send({message:'Email or password is invalid'})
    }
    if (userData.password != user.password) {
        return response.status(401).send({message:'Email or password is invalid'})     
    }
    var payload = {}
    var token = jwt.encode(payload,'12345')
    return response.send({token})
})

var user = { router,checkAuthenticated:(request,response,next)=>{
    console.log('...')
  if(!request.header('authorization')){
    return response.status(401).send('You are not authorized for this action!')
  }
  var token = request.header('authorization').split(' ')[1]
  var payload = jwt.decode(token,'12345')
  if(!payload){
    return response.status(401).send({message:'Token isnt valid'})
  }
  next()
} };

module.exports = user;
