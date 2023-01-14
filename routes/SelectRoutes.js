const express = require('express');
const SelectRoutes = express.Router();
const selectsong = require("../Schema/selectsong");
// const selectsong = require('../Schema/selectsong');
// const tokenvarify = require("../token/tokenvarify");

SelectRoutes.post("/add",async (req, res) => {
    const insertsongname = req.body.insertsongname;
    const existmail = req.body.existmail;
        const user = new selectsong({
            insertsongname:insertsongname,
            existmail:existmail
        })
        const usersave = await user.save();
        res.send(usersave);
        console.log(usersave);
    // res.send("hello basith");
})



module.exports = SelectRoutes;