const express = require('express');
const listRoutes = express.Router();
const playlist= require("../Schema/playlist")
const tokenvarify = require("../token/tokenvarify");

listRoutes.post("/create",tokenvarify,async (req, res) => { 
   const listplay =  req.body.playlist;
if(!listplay)
{
    res.send("Empty...!");
}
else{
    const user = new playlist({
        playlist: listplay,
     })
     const usersave = await user.save();
     res.send(usersave);
     console.log(usersave);
}
 })

 listRoutes.get("/list",tokenvarify,async(req,res)=>{
    const allsong = await playlist.find({});
    res.send(allsong);
})

// listRoutes.post("/adddata",async(req,res)=>{
//     console.log(req.body.insertsongname)
//     // res.send("basith");
// })


listRoutes.get('/delete/:Id',tokenvarify, async (req, res) => {
    try {
        const removedPost = await playlist.deleteOne({ _id: req.params.Id })
        res.json(removedPost)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = listRoutes;


