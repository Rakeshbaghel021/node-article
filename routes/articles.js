var express = require('express');
var router = express.Router();
var auth= require('../middleware/auth');

var Article = require('../models/article');
var Comment = require('../models/comment');

/* GET users listing. */




// get artilces 
router.get("/", (req, res) => {
  Article.find((err, articlesList) => {
      res.render("articles", {articlesList: articlesList})
    })
})

// rendering create a article form
router.get("/create",auth.checkUserLogin,(req,res) => {
    res.render('createArticle');
})


// creating a article
router.post("/",auth.checkUserLogin, (req, res) => {
  console.log(req.body, req.user);
  req.body.author = req.user.id;
  Article.create(req.body, (err, createdArticle) => {
    console.log(err, createdArticle);
    if(err) return res.json({err});
    res.redirect("/articles")
  })
});


// Get Single article
router.get("/:id", (req, res) => {
  Article.findById(req.params.id).populate('author',"username email").exec( (err, article) => {
    Comment.find({articleId : req.params.id}).populate('author',"username").exec( (err, comments) => {
      console.log(article, comments);
    res.render('singleArticle', { article: article, comments : comments });
    })
  })
});


// edit article form
router.get("/:id/edit", auth.checkUserLogin,(req,res) => {
  Article.findById(req.params.id, (err,article) => {
      if(err) return res.json({err});
      res.render("editArticle",{article: article})
  })
})

// edit article 
router.post("/:id",auth.checkUserLogin, (req,res) => {
  Article.findByIdAndUpdate(req.params.id, req.body, (err,updatedArticle) => {
      if(err) return res.json({err});
      res.redirect("/articles/" + updatedArticle.id)
  })
})


// deleting article
router.get("/:id/delete", auth.checkUserLogin,(req,res) => {
    Article.findByIdAndDelete(req.params.id, (err,article) => {
      if(err) return res.json({err});
      res.redirect("/articles/")
  });
  
  
});

module.exports = router;
