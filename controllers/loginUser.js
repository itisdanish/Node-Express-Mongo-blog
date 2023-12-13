const User = require('../database/models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;
 
        // Find a user in the database based on the provided email
        const user = await User.findOne({ email: email });

        if (user) {
            // If a user is found, compare the provided password with the hashed password in the database
            const same = await bcrypt.compare(password, user.password);

            if (same) {
                // Passwords match, user is authenticated, redirect to the desired page
                req.session.userId = user._id
                res.redirect('/');
            } else {
                // Passwords do not match, redirect to the login page
                res.redirect('/auth/login');
            }
        } else {
            // If no user is found with the provided email, throw an error
            throw new Error('User not found');
        }
    } catch (error) {
        // Handle any errors that occur during the login process
        console.error('Error during login:', error);
        res.redirect('/auth/login');
    }
};
