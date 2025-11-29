const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'));

// =========================== END OF APP CONFIGURATION

// ESTABLISHING THE MONGODB CONNECTION
const uri = process.env.ATALS_URI
mongoose.connect(uri, {}) 

const connection = mongoose.connection
connection.once('open',() => {
  console.log("MongoDB database connection established successfully!")
})

// app.get('/', (req, res) => {
//   res.send('Hello !')
// })

// =========================== Routes ===========================
const grillsRouter = require('./routes/grills')
const usersRouter = require('./routes/users')

app.use('/grills', grillsRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
