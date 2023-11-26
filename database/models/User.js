const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Define the User Schema using Mongoose
const UserSchema = new mongoose.Schema({
    // Field for storing the username of the user
    username: {
        type: String,
        required: true,
        unique: true
    },
    // Field for storing the email address of the user
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Field for storing the password of the user
    password: {
        type: String,
        required: true
    },
});

UserSchema.pre('save', function(next){
    const user = this
    // 
    bcrypt.hash(user.password, 10, function(error,encrypted){

        user.password = encrypted
        next()
    })
})

// Export the User model based on the defined schema
module.exports = mongoose.model('User', UserSchema);
