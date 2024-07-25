const mongoose = require("mongoose");
const { commentSchema } = require("./commentSchema")

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    viewHistory: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref:"Blog"}],
        required: false,
        unique: false
    },
    // comments: {
    //     // These arent the same comments as the Blog contain, they reuse the CommentSchema
    //     types: [commentSchema],
    //     required: false
    // }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
    UserModel
}
