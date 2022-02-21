require('dotenv').config()

const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')

app.use(express.json())

app.post('/token' )

app.post('/login', (req, res) => {

    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    console.log("Logged!")
    res.json({ accessToken: accessToken, refreshToken: refreshToken })

})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

app.listen(4000, () => {
    console.log("Main sever running at port 4000..")
})