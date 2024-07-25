const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, // One to Many relationship
        required: true
    },
    likes: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}], // Many to Many relationships
        required: false
    },
    headerImage: {
        type: String, // URL to the file/image storage provider
        required: false

    },
    tags: { // keywords defined by the blog post author
        type: [String], // ["travel", "anime"]
        required: true
    },
    categories: { // post category defined by website admin/developer
        type: [String], // ["travel", "anime"]
        enum: ["life", "travel", "photography", "coding"],
        required: true
    },
    editHistory: {
        type: [{user: String, timestamp: Date}],
        required: false
    }
},
{
    timestamps: true
});

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = {
    BlogModel
}