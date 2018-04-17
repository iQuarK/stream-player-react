"use strict";

const express = require("express");
const app = express();
const http = require("http").Server(app);
const fs = require("fs");
const config = require("./config.json");

app.use(express.static("build"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/listen/:filename", (req, res) => {
    const filename = req.params.filename;
    let myReadStream;

    res.writeHead(200, { "Content-Type": "audio/mpeg" });
    if (config.songs.locationType === "local") {
        myReadStream = fs.createReadStream(__dirname + `/audios/${filename}`);
    }

    myReadStream.pipe(res);
});

http.listen(config.server.port, function() {
    console.log(`listening on ${config.server.host}:${config.server.port}`);
});
