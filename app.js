require("dotenv").config()
require("./config/database").connect()
const express = require('express')
var bcrypt = require('bcryptjs');

const User = require('./model/user')

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>hello from auth system!</h1>")
})

// database might take some time fetching the data. changing the method to async
app.post('/register', async (req, res)=> {
    const {firstName, lastName, email, password} = req.body

    if(!(firstName && lastName && email && password))
        res.status(400).send("All fields are required!")
    
    const existingUser = await User.findOne({ email }) // promise

    if(existingUser)
        res.status(401).send("User Already exist!")

    const myEncPassword = await bcrypt.hash(password, 10)
    
    User.create({
        firstName,
        lastName,
        email : email.toLowerCase(),
        password: myEncPassword
    })

    res.status(200).send('User Registered!')
})

module.exports = app