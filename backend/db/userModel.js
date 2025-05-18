const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },     // optional if not required
    email: { type: String },    // optional if not required
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
