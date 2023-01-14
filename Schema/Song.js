const mongoose =  require('mongoose');
const userSchema = new mongoose.Schema({
    songname:{
                type:String,
                required:true,
         },
         authorname:{
               type:String,
               required:true,
        },
        moviename:{
              type:String,
              required:true,
       },
        songfile:{
                type:String,
                required:true,
         }
        })

module.exports = mongoose.model("Song",userSchema)