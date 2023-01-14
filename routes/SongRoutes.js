const express = require('express');
const SongRoutes = express.Router();
const Song = require("../Schema/Song")
const tokenvarify = require("../token/tokenvarify");
//songs add API 
SongRoutes.post("/add",async (req, res) => {
    // console.log(req.body.songname);
    // console.log(req.body.authorname);
    // console.log(req.body.moviename);
    // console.log(req.body.songfile);

    const user = new Song({
        songname: req.body.songname,
        authorname: req.body.authorname,
        moviename: req.body.moviename,
        songfile: req.body.songfile,
    })
    const usersave = await user.save();
    res.send(usersave);
    console.log(usersave);
})


SongRoutes.get("/allsongs", tokenvarify, async (req, res) => {
    const allsong = await Song.find({});
    res.send(allsong);
})

SongRoutes.get('/delete/:Id', async (req, res) => {
    try {
        const removedPost = await Song.deleteOne({ _id: req.params.Id })
        res.json(removedPost)
    } catch (err) {
        res.json({ message: err })
    }
})

SongRoutes.post("/searchsong", async (req, res) => {
    // console.log(req.body.textvalue);
    var txtvalue = req.body.textvalue;
    if(!txtvalue)
    {
        res.send("Empty..!");
    }
    else{
        const allsong = await Song.find({"songname":txtvalue});
        if(!allsong)
        {
            res.send("No Songs...!");
        }
        else{
            res.send(allsong);
        }
    }
})

module.exports = SongRoutes;
