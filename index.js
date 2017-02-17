var path = require('path');
var express = require("express");

var exampleAppPort = 8099;

var exampleApp = express();
exampleApp.use(express.static(path.join(__dirname, "/public")));
exampleApp.use(express.static(path.join(__dirname, "/bower_components")));

exampleApp.get("/", function (req, res) {
    res.render("index.html", {});
});

console.log("Example app is now running on port: " + exampleAppPort);
exampleApp.listen(exampleAppPort);
