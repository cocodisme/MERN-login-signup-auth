const express = require('express')
const app = express()
const {UpdateData,DeleteData} = require('./controller/UDcontroller')

const {validator,AlreadyExist} = require('../middleware/AuthMiddleware')
const {VerifyUser,VerifyAdmin,VerifyVendor} = require('../middleware/VerifyUser')

// @access Public
app.post('/update',VerifyUser,UpdateData) 



// @access Admin
app.get('/delete/:id',VerifyAdmin,DeleteData) 

module.exports = app