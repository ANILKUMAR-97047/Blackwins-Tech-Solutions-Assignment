const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\+?[\d\s-]{10,}$/, 'Please provide a valid phone number']
    },
    address: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Index for search functionality
contactSchema.index({ name: 'text', email: 'text' });

module.exports = mongoose.model('Contact', contactSchema);