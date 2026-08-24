const mongoose=require('mongoose');

const noteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const bookSchema=new mongoose.Schema({
title:{
    type:String,
    required:true,
},
author:{
    type:String
},
genre:{
    type:String,
enum:["Fiction",
  "Non-Fiction",
  "Fantasy",
  "Sci-Fi",
  "Mystery",
  "Thriller",
  "Romance",
  "Historical Fiction",
  "Horror",
  "Biography",
  "Memoir",
  "Self-Help",
  "Graphic Novel",
  "Manga"]},
status:{
    type:String,
    enum:['wanttoread','finished','reading']},
rating:{
    type:Number,
    min:1,max:5,

},
reviewtext:{
    type:String
},
favoritedBy: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
],
coverImage:{
    type:String},
notes:[noteSchema],
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
}

})
const Book=mongoose.model('Book',bookSchema);
module.exports=Book;