var User = require('../models/user');

exports.checkUserLogin = (req,res, next) =>{
    if(req.session && req.session.userId) {
        next();
    } else{
        res.redirect('/users/login');
    }
}

exports.getUserInfo = (req, res, next)=>{
    if(req.session && req.session.userId){
        console.log(req.session.userId);
        User.findById(req.session.userId, (err, user) => {
            console.log(err, user);
            if(err) return next(err);
            req.user=user;
            res.locals.user=user;
            next();
        })
    } else {
        req.user=null;
        res.locals.user=null;
        next();
    }
}