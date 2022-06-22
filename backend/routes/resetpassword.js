const express = require('express')
const app = express()
const {resetLink,verifyPasswordToken,verifyAndUpdatePassword} = require('./controller/resetPassword')

//password update
app.post("/resetpassword",resetLink)

//verifying token with get Method
app.get("/resetpassword/:token",verifyPasswordToken)

//verifying token and resetting password
app.post("/resetpassword/:token",verifyAndUpdatePassword)

module.exports = app