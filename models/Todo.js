const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    userID: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    completed : Boolean,
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Todo', todoSchema);