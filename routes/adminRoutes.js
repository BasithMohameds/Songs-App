const express = require('express');
const adminRoutes = express.Router();
// const Admin = require("../Schema/admin")
const tokenGenerator = require("../token/token");

adminRoutes.post("/login",async (req, res) => {
    const myemail = "admin@gmail.com";
    const mypassword = "basith123";
    if(!(myemail == req.body.email && mypassword ==req.body.password))
    {
        res.send("Invalid login...!");
        console.log("Invalid login...!");
    }
    if((myemail === req.body.email  && mypassword ==req.body.password)){
        const token = await tokenGenerator(myemail);
        res.send({"token":token});
        // console.log("welcome admin...!")
    }
    // const admin = await Admin.findOne({ email: req.body.email });
    // if (!admin) {
    //     return res.status(400).send('Email Not Found');
    // }
    // if(admin){
    //     res.send(admin);
    // }
    // else{
    //     return res.status(400).send("welcome admin")
        // if (!validPass) {
        //     return res.status(400).send('Invaild password');
        // }
        // else {
        // //    const token = await tokenGenerator(user.email);
        // //    res.cookie("jwt",token,{httpOnly:true});
        // //    res.send({"token":token});
        // res.send("done")
        // }
    // }
})

module.exports = adminRoutes;