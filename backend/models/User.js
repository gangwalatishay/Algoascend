const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['student', 'professional', 'admin'],
        default: 'student'
    },
    institution: {
        type: String,
        default: ''
    },
    batchYear: {
        type: String,
        default: ''
    },
    companyName: {
        type: String,
        default: ''
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    // Password reset fields
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
