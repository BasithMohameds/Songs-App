const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    playlist: {
        type: String,
        // unique: true
        // required:true
    },
    personmail: {
        type: String,
        unique: true
    },
    mysongcoll:[]
    
})
module.exports = mongoose.model("playlist", userSchema)