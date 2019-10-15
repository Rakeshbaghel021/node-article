var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/register", function(req, res, next) {
  res.render("register", { title: "Register" });
});

router.post("/register", function(req, res, next) {
  User.create(req.body, (err, createdUser) => {
    if(err) return next(err);
    res.redirect('/users/login')
  })
   
});

router.get("/login", function(req, res, next) {
  res.render("login", { title: "Login" });
});

router.post("/login", function(req, res, next) {
  
  // res.render("login", { title: "login" });
  User.findOne({ email: req.body.email }, (err, user) => {
    if(err) return next(err);
    if(!user) return next(err);
    if(!user.matchPassword(req.body.password)){
      res.send("password not matched");
    };
    req.session.userId = user.id;
    res.redirect("/articles/");

  });
});
router.get("/logout", function(req,res){
 req.session.destroy();
  res.redirect('/users/login')
});

module.exports = router;
