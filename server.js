require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
    {
        username: "Daniel",
        title: "Post 1"
    },
    {
        username: "Danny",
        title: "Post 2"
    },
    {
        username: "Arik",
        title: "Post 3"
    }
]

// API'S
app.get('/',(req, res) => {
    res.status(200).json({message:"Hello World!"})
})

app.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name))
})

// Middleware

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// RUN SERVER
app.listen(3000, () => {
    console.log("Main sever running at port 3000..")
})