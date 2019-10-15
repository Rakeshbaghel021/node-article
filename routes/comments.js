var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

router.get('/:id',(req,res)=>{
    Comment.findById(req.params.id, (err, commentList) => {
        res.render('singleArticle', {commentList});
    })
});

// create comments
router.post("/", (req, res) => {
  req.body.author = req.user.id;
  if(req.session && req.session.userId){
    Comment.create(req.body, (err, createdComment) => {
      console.log(err, createdComment);
      if(err) return res.json({err});
      res.redirect("/articles/" + createdComment.articleId)
  })
  }else {
    res.redirect("/users/login")
  }
    
});
// edit comment
router.get("/:id/edit", (req,res) => {
  if(req.session && req.session.userId) {
    Comment.findById(req.params.id, (err,comment) => {
      if(err) return res.json({err});
      res.render("editComment",{comment : comment})
  })
  } else{
    res.redirect("/users/login")
  }
    
  })

//  update comment 
  router.post("/:id/update", (req,res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, (err,updatedcomment) => {
        if(err) return res.json({err});
        res.redirect("/articles/" + updatedcomment.articleId)
    })
  })

// deleting comments
router.get("/:id/delete", (req,res) => {
  if(req.session && req.session.userId){
    Comment.findByIdAndDelete(req.params.id, (err,comment) => {
      if(err) return res.json({err});
      res.redirect("/articles/" + comment.articleId);
  })
  } else{
    res.redirect("/users/login")
  }
    
  })


module.exports = router;