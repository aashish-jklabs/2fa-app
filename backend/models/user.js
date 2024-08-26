const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    provider: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    totpSecret: { type: String },
    isTotpEnabled: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);