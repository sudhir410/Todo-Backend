const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    activity: { type: String, required: true },
    status: { type: String, required: true, default: 'pending' },
    time_taken: { type: String },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" }

})


const todoModel = mongoose.model('Todo', todoSchema)
module.exports = todoModel;