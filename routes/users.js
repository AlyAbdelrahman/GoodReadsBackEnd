var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const User = require('../Models/UserModel')
const jwt = require('jsonwebtoken');
const authMiddleware = require('./../middlewares/authentication')


router.post('/register', function (req, res, next) {
  if (req.body.password !== req.body.confirmPassword) {
    var err = new Error('Passwords error');
    err.status = 400;
    return next(err);
  }
  else {
    const user = new User(req.body)
    user.save()
      .then(user => { res.send(user); })
      .catch(err => {
        next(createError(400, err.message))
      })
  }
});

router.post('/login', async (req, res, next) =>{
const {email,password}=req.body;
const currentUser = await User.findOne({email});
if(!currentUser) return next(createError(401));
debugger;
const  passwordMatch = await currentUser.verifyPassword(password);
// console.log(passwordMatch)
if(!passwordMatch) return next(createError(401))
 const token = await  currentUser.generateToken()
res.send({
 Profile: currentUser,
  token})
// else{
//   res.send('false')
// }

})
router.use(authMiddleware)

router.post('/test', function (req, res, next) {
  // console.log(req.body)
res.send(req.body)


})


module.exports = router;
