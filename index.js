const path = require('path')
const express = require('express')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const { networkInterfaces } = require('os')
const expressSession = require('express-session')

// Import controllers
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const registerController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginNewController = require('./controllers/loginUser')

const app = new express()
app.use(expressSession({
  secret:'secret'
}))

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog-test-data')
  .then(() => console.log('Database Connected!'));

// Middleware
app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge)

app.set('views', `${__dirname}/views`)

// Middleware for handling the post creation process
const storeMiddleware = require('./middleware/storePost')

// Apply the storeMiddleware for the '/posts/store' route
app.use('/posts/store', storeMiddleware)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Route for displaying all posts on the home page
app.get('/', homePageController)

// Route for displaying the form to create a new post
app.get('/post/new', createPostController)

// Route for handling the creation of a new post
app.post('/posts/store', storePostController);

// Route for displaying a single post based on its ID
app.get('/post/:id', getPostController)

// Route for displaying the form to create a new user
app.get('/auth/register', registerController)

// Route for handling the registration of a new user
app.post('/users/register', storeUserController)

// Route for displaying the login form
app.get('/auth/login', loginController)

// Route for handling the login process
app.post('/users/login', loginNewController)

// Catch-all route for unknown paths, renders the 'about' page
app.get('*', (req, res) => {
    res.render('about')
})

// Start the server on port 8080
app.listen(8080, () => {
    console.log('Server Started...8080')
})
