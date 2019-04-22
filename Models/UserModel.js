
const mongoose = require('mongoose');
const validator = require("validator");
const integerValidator = require('mongoose-integer');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const util = require('util');
const signPromise = util.promisify(jwt.sign)
const verifyToken = util.promisify(jwt.verify)
const Schema = mongoose.Schema;

// const ObjectId = Schema.ObjectId;
const saltRounds = 5; 

const UserSchema = new Schema({

    Firstname: {
        //index:{unique:true},
        type: String,
        required: true,
        minlength: 3
    },
    Lastname: {
        //index:{unique:true},
        type: String,
        required: true,
        minlength: 3
    },

    email: {
        type: String,
        unique:true,
        required: true,
        validate: validator.isEmail
    },
    gender: {
        type: String,
        required:true,
        enum: ['male', 'female', 'n/a'],
        lowercase: true,
        default: 'n/a'
    },
    age: {
        type: Number,
        required:true,
        integer: true,
        min: 18
    },
    password:{
        required:true,
        type:String,
        min:7,
    },
    confirmPassword:{
        required:true,
        type:String,
        min:7
    }

   
})

 UserSchema.method('generateToken',function(){
    const currentUser = this;
    return signPromise({_id:currentUser._id},'secretKey',{
         expiresIn:'2h'
     })
    
 })

 
 UserSchema.static('verifyToken',async function(token){
    const userModel = this;
    const decoded = await verifyToken(token,'secretKey')
    const userId = decoded._id;
    return userModel.findById(userId)
 })

UserSchema.method('verifyPassword',function(password){
      const currentUser=this;

      return bcrypt.compare(password,currentUser.password);
  })



UserSchema.pre('save',async function(){
    const currentUser = this;
    if(currentUser.isNew){
        currentUser.password=await hashpassword(currentUser.password);
        currentUser.confirmPassword=await hashpassword(currentUser.confirmPassword);

        // currentUser.confirmPassword=await hashpassword(currentUser.confirmPassword);


    }
}
)
const hashpassword=(password)=>bcrypt.hash(password,saltRounds);


UserSchema.plugin(integerValidator);
const MyUserModel = mongoose.model('users', UserSchema);
module.exports = MyUserModel;
