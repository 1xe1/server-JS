require('dotenv').config()
require('express-async-errors')
const express = require('express');
const app = express()
const cors = require('cors')
const coreOptions = require('./src/config/corsOptions')
const mongoose = require('mongoose');


app.use(express.json())
app.use(cors())

console.log(process.env.PORT)

app.listen(3300,() => console.log('Server is runing with port 3300'))