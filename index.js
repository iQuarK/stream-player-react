"use strict";

const express = require("express");
const app = express();
const http = require("http").Server(app);
const fs = require("fs");
const config = require("./config.json");

app.use(express.static("build"));

app.get("/", (req, res) => {
    console.log("sending index");
    res.sendFile(__dirname + "/index.html");
});

app.get("/listen/:filename", (req, res) => {
    const filename = req.params.filename;
    const params = req.url.split("?")[1];
    let query = params
        ? params.split("&").reduce(
              (acc, i) =>
                  // return the list of parameters in the querystring
                  ({ [i.split("=")[0]]: i.split("=")[1] }),
              {}
          )
        : {};
    console.log(
        "req made " + req.url + "   ",
        __dirname + `/${filename} query:`,
        query,
        "\nQUERY",
        req
    );

    let myReadStream;
    if (config.locationType === "local") {
        const range = {
            start: query && query.start ? parseInt(query.start, 10) : 0,
            end: 1024
        };
        myReadStream = fs.createReadStream(__dirname + `/${filename}`); //, range);

        res.writeHead(200, { "Content-Type": "audio/mpeg" });
        myReadStream.on("data", chunk => {
            console.log(`Received ${chunk} bytes of data.`);
        });
    }

    myReadStream.pipe(res);
});

http.listen(4000, function() {
    console.log("listening on *:4000");
});
console.log("listening on http://127.0.0.1:4000");
