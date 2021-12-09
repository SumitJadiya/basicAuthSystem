require("dotenv").config()
const express = require('express')

const User = require('./model/user')

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>hello from auth system!</h1>")
})

app.post('/register', (req, res)=> {
    const {firstName, lastName, email, password} = req.body

    if(!(firstName && lastName && email && password))
        res.status(400).send("All fields are required!")
    
    const existingUser = User.findOne({ email })

    if(existingUser)
        res.status(401).send("User Already exist!")

    res.status(200).send('User Registered!')
})

module.exports = app