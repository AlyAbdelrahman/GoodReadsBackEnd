
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({

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

    DateOfBirth: {
        type: Date,
        required:true,
    },

})

const AuthorModel = mongoose.model('Authors', AuthorSchema);
module.exports = AuthorModel;