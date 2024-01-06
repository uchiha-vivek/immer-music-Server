require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
 const dbConnection= require('./db/conn.js')
const userRoutes = require("./routes/users.js");
const authenticationRoutes = require("./routes/authentication.js");
const songRoutes = require("./routes/songs.js");
const playListRoutes = require("./routes/playlist.js");
const searchRoutes = require("./routes/search.js");
const { func } = require("joi");
const app = express();
//Database connection
dbConnection()
// middlewares for parsing
app.use(cors());
app.use(express.json());
// Routes/api end points
app.use("/immer/users/", userRoutes);
app.use("/immer/login/", authenticationRoutes);
app.use("/immer/songs/", songRoutes);
app.use("/immer/playlists/", playListRoutes);
app.use("/immer/", searchRoutes);

const PORT = process.env.PORT || 8080; 
const server = function(){
    app.listen(PORT,() => {
        console.log(`Server is running successfully on PORT ${PORT}`)
    })
}
server()