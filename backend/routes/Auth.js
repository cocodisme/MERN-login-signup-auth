const express = require('express')
const app = express()
const {Signup,Login,readME,readAllUsers} = require('./controller/AuthController')
const {validator,AlreadyExist} = require('../middleware/AuthMiddleware')
const {VerifyUser,VerifyAdmin,VerifyVendor} = require('../middleware/VerifyUser')

// @access Public
app.post('/signup',validator,AlreadyExist,Signup)         

app.post('/login',Login)

app.get('/readME',VerifyUser,readME)

// @accuess Admin
app.get('/readAll',VerifyAdmin,readAllUsers)

module.exports = app