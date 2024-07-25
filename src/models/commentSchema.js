

const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        required: false
    }
});

module.exports = {
    CommentSchema
}