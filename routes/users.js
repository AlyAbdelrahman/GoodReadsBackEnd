var express = require('express');
var router = express.Router();
// const createError = require('http-errors');
const User = require('../Models/UserModel')
/* GET users listing. */
router.post('/register', function(req, res, next) {

  if (req.body.password !== req.body.confirmPassword  && req.body.password.match(/^.*(?=.{8,})/) &&    req.body.confirmPassword.match(/^.*(?=.{8,})/)   ) {
    var err = new Error('Passwords error');
    err.status = 400;
    return next(err);
}



else{
  User.create(req.body)
  .then(user=>{res.send(user);})
  .catch(err=>{
    next(createError(400,err.message))
  })
}
  // res.send('respond with a resource');
});

module.exports = router;
