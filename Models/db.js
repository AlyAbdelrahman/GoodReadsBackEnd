const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/GoodReads', {useCreateIndex: true,useNewUrlParser:true});