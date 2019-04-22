const createError = require('http-errors');
const userModel = require ('./../Models/UserModel')

module.exports= async(req,res,next)=>{
    try{
    //check if user sent token
    if(!req.headers.authorization)  return next (createError(401));
    //splice the token from bear
    const [,token] = req.headers.authorization.split(' ');

    //check the token validation
    const user = await  userModel.verifyToken(token)
    if(!user) return next (createError(401));
    req.user = user; 
    // console.log(user)
  
    next()}

    catch(err){
    next (createError(401))
    }
}