module.exports = (req, res, next)=>{
    console.log('Middleware Test')
    if(!req.files || !req.files.image || !req.body.title || !req.body.subtitle || !req.body.content || !req.body.username){
        return res.redirect('/post/new')
    }
    next()
}