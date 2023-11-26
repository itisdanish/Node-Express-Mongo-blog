const User = require('../database/models/User');

module.exports = (req, res) => {
    // Use the promise returned by create
    User.create(req.body)
        .then(user => {
            // Successfully created user
            res.redirect('/');
        })
        .catch(error => {
            return res.redirect('/auth/register')
            // Handle the error
            // console.error('Error creating user:', error);
            // res.status(500).send('Internal Server Error');
        });
};
