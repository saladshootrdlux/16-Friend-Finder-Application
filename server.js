var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var apiroutes = require("./app/routing/apiroutes.js");
var htmlroutes = require("./app/routing/htmlroutes.js");

app.use(apiroutes);
app.use(htmlroutes);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});