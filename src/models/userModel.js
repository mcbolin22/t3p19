const mongoose = require("mongoose");

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
    }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
    UserModel
}
