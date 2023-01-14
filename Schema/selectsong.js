const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    insertsongname: {
        type: String,
    },
    existmail: {
        type: String,
    }
})

module.exports = mongoose.model("selectsong", userSchema)