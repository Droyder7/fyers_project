const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema({
    keyName: { type: String, required: true },
    keyValue: { type: String, required: true },
    broker: { type: String, required: true },
});

module.exports = mongoose.model("Credential", credentialSchema);