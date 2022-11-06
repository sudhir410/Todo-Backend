const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
const userRouter = require('./routes/user')
const port = 8000
var cors = require('cors')
const todoRouter = require('./routes/todo')


app.use(cors())
mongoose.connect('mongodb+srv://sudhirchoudhary410:sudhir410@startup.a101qex.mongodb.net/TODO?retryWrites=true&w=majority', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('database connected')
    }
})

app.use('/', userRouter)
app.use('/', todoRouter)

app.get('*', (req, res) => {
    res.status(404).send('page not found')
})
app.listen(port || process.env.port, () => { console.log("server listening") })