const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/blog-test-data')
  .then(() => console.log('Database Connected!'));


Post.create({
    title: 'Extra days', 
    description: 'yes you can do definetly!!',  
    content: 'Done'
})
.then(post=>{console.log(`Created : ${post}`)})
.catch(error=>{console.log(`fault : ${error}`)}) 
