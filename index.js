const path = require('path')
const express = require('express')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const Post = require('./database/models/Post')

const app = express()

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog-test-data')
  .then(() => console.log('Database Connected!'));

// Middleware
app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge)

app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

// Route for displaying all posts on the home page
app.get('/', async (req, res) => {
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts
    })
})

// Route for displaying the form to create a new post
app.get('/post/new', (req, res) => {
    res.render('create')
})

// Route for handling the creation of a new post
app.post('/posts/store', (req, res) => {
    const { image } = req.files

    // Move the uploaded image to the specified directory
    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {
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
});

// Route for displaying a single post based on its ID
app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
})

// Routes for other pages
app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/about', (req, res) => {
    res.render('about')
})

// Catch-all route for unknown paths, renders the 'about' page
app.get('*', (req, res) => {
    res.render('about')
})

// Start the server on port 8080
app.listen(8080, () => {
    console.log('Server Started...8080')
})
