
const mongoose = require('mongoose');
const validator = require("validator");
var integerValidator = require('mongoose-integer');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;


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

UserSchema.plugin(integerValidator);
const MyUserModel = mongoose.model('users', UserSchema);
module.exports = MyUserModel;
