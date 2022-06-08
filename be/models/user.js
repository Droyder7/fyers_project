const mongoose = require("mongoose");
const credentialSchema = require("./credential").schema;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    credential: [[credentialSchema]],
    tradelog: { type: String },
});

module.exports = mongoose.model("User", userSchema);