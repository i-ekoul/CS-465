const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Defining the user schema
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    name: { 
        type: String, 
        required: true 
    },
    hash: { 
        type: String, 
        required: true 
    }
});

// Method to check password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.hash);
};

const User = mongoose.model('users', userSchema);

module.exports = User;
