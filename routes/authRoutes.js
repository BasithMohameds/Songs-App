const express = require('express');
const authRoutes = express.Router();
var objectid = require('mongodb').ObjectID;
const Client = require("../Schema/Client")
const bcrypt = require('bcryptjs');
const tokenGenerator = require("../token/token");
const tokenvarify = require("../token/tokenvarify");
// const hashValidation = require("../helpers/hashing");
// const authverify = require('../helpers/authverify')
//user signup page
authRoutes.post("/signup", async (req, res) => {
    const salt = await bcrypt.genSalt(5);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new Client({
        username: req.body.username,
        email: req.body.email,
        password: hashpassword
    })
    const usersave = await user.save();
    res.send(usersave);
    console.log(usersave);
})


//user signin page
authRoutes.post("/signin", async (req, res) => {
    const user = await Client.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email Not Found');
    }
    else{
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).send('Invaild password');
        }
        else {
           const token = await tokenGenerator(user.email);
        //    res.cookie("jwt",token,{httpOnly:true});
           res.send({"token":token});
        // res.send("done")
        }
    }
})


// authRoutes.get("/protected",async (req, res) => {
// res.send("Welcome...!");
// })

authRoutes.get("/alldata",tokenvarify,async(req,res)=>{
    const alldata = await Client.find({});
    res.send(alldata);
})

authRoutes.get('/delete/:Id', async (req, res) => {
    try {
        const removedPost = await Client.deleteOne({ _id: req.params.Id })
        res.json(removedPost)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = authRoutes;

