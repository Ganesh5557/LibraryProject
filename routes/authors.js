const express = require ('express')
const app = express()
const router = express.Router()
const Author = require('../models/author')

//All Authors

router.get('/', async (req,res) => {
let searchOptions ={}
if (req.query.name != null && req.query.name !== ''){
    //Regexp returns full words even if few words are searched
    searchOptions.name = new RegExp(req.query.name, 'i')
}

    try {
        const authors = await Author.find({searchOptions})
        res.render('authors/index', {
            authors:authors, searchOptions:req.query
        })
        
    } catch (error) {
        
res.redirect('/')    }
    
})

//New Author 
router.get('/new', (req,res) => {
    res.render('authors/new', {author: new Author()})
})

//In REST, creation is accompanied by post
router.post('/', async (req,res) => {
    const author = new Author({
        name:req.body.name
    })
    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch  {
        res.render('authors/new',{
            author: author,
            errorMessage: 'Error creating Author'
    })
}
})



    

module.exports = router