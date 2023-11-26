const Post = require('../database/models/Post')
const path = require('path')


module.exports = (req, res) => {
    const { image } = req.files

    // Move the uploaded image to the specified directory
    image.mv(path.resolve(__dirname,'..','public/posts', image.name), (error) => {
        // Create a new post with the data from the request
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        })
        .then(post => {
            console.log(`Created : ${post}`);
            res.redirect('/');
        })
        .catch(error => {
            console.log(`Fault : ${error}`);
        });
    })
}