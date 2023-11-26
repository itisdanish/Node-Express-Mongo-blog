const path = require('path')
const express = require('express')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const Post = require('./database/models/Post')
const { networkInterfaces } = require('os')

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')

const app = express()

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog-test-data')
  .then(() => console.log('Database Connected!'));

// Middleware
app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge)

app.set('views', `${__dirname}/views`)

const storeMiddleware = require('./middleware/storePost')

app.use('/posts/store', storeMiddleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

// Route for displaying all posts on the home page
app.get('/', homePageController)

// Route for displaying the form to create a new post
app.get('/post/new', createPostController)

// Route for handling the creation of a new post
app.post('/posts/store', storePostController);

// Route for displaying a single post based on its ID
app.get('/post/:id', getPostController)

// Catch-all route for unknown paths, renders the 'about' page
app.get('*', (req, res) => {
    res.render('about')
})

// Start the server on port 8080
app.listen(8080, () => {
    console.log('Server Started...8080')
})