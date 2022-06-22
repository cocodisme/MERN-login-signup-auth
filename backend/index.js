const express = require('express')
const app =  express()
const PORT = 8000
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./database/connection.js')

app.use(cors())
app.use(express.json())
app.use('/api',require('./routes/Auth.js'))
app.use('/api',require('./routes/UD.js'))
app.use('/api',require('./routes/resetpassword.js'))
connectDB()

app.listen(PORT,e=>console.log(`server is on port : ${PORT}`))