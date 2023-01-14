const express = require('express');
const listRoutes = express.Router();
const playlist = require("../Schema/playlist")
const tokenvarify = require("../token/tokenvarify");

listRoutes.post("/create",tokenvarify,async (req, res) => {
    const listplay = req.body.playlist;
    const personmail = req.body.personmail;
    
    if (!listplay) {
        res.send("Empty...!");
    }
    else {
        const user = new playlist({
            playlist: listplay,
            personmail:personmail,
        })
        const usersave = await user.save();
        res.send(usersave);
        console.log(usersave);
    }
})

listRoutes.get("/list",async (req, res) => {
    const allsong = await playlist.find({});
    res.send(allsong);
})

listRoutes.post("/addthis",async(req,res)=>{
    console.log(req.body.mysong);
    console.log(req.body.myid);
    const basithid = req.body.myid;
    const basithsong = req.body.mysong;

   const updatesong = await playlist.findByIdAndUpdate({_id:basithid},{$push:{ mysongcoll: basithsong}});
   console.log(updatesong);
})

listRoutes.get('/delete/:Id', tokenvarify,async (req, res) => {
    try {
        const removedPost = await playlist.deleteOne({ _id: req.params.Id })
        res.json(removedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

listRoutes.get("/listid/:Id",async (req, res) => {
    const allsong = await playlist.findById({ _id: req.params.Id})
    res.send(allsong.mysongcoll);
    console.log(allsong.mysongcoll);
})

module.exports = listRoutes;