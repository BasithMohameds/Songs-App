const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const SongRoutes = require('./routes/SongRoutes');
const listRoutes = require('./routes/listRoutes');
const SelectRoutes = require('./routes/SelectRoutes');
const dotenv = require('dotenv');
// const cookieParser =require ('cookie-parser');
const cors = require('cors');
app.options("*",cors());
app.use(cors());
dotenv.config()
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://Basith:basith@cluster0.tklaroe.mongodb.net/?retryWrites=true&w=majority",
    ()=>{
    console.log("DB connected.....!")
})

app.use(express.json());

app.use("/user",authRoutes);

app.use("/admin",adminRoutes);

app.use("/song",SongRoutes);

app.use("/playlist",listRoutes);

app.use("/select",SelectRoutes);

app.listen(5000,()=>{
    console.log("Server Started..")
});
