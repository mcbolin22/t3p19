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
    password: {
        type: String,
        required: true,
        unique: false,

    },
    // comments: {
    //     // These arent the same comments as the Blog contain, they reuse the CommentSchema
    //     types: [commentSchema],
    //     required: false
    // }
});

UserSchema.pre(
    "save",
    async function (next) {
        const user = this;

        console.log("Pre-save hook running")

        if (!user.isModified("password")){
            return;
        }

        console.log("Pre-save hook running - password is modified.")

        // once this line of code is reached, the password is modified and not encrypted.

        // We still must encrypt

        // console.log("Pre-save hook running - password is encrypted.")

        next();
    }
)

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
    UserModel
}
