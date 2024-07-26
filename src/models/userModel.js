const mongoose = require("mongoose");
const { commentSchema } = require("./commentSchema")
const bcrypt = require("bcryptjs");

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
            return next();
        }

        console.log("Pre-save hook running - password is modified.")

        // once this line of code is reached, the password is modified and not encrypted.

        console.log("Raw password is: " + this.password);

        const hash = await bcrypt.hash(this.password, 10);

        console.log("Password is salted, hashed and encrypted: " + hash);

        this.password = hash;

        next();
    }
)

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
    UserModel
}
