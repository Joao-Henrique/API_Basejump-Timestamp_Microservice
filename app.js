//REQUIRE NECESSARY MODULES
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");

//CREATE AN INSTANCE OF EXPRESS FOR THE APP AND INITIATE BODYPARSER AND CORS
var app= module.exports = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static(__dirname));


app.get('/', function(req, res){
  res.sendFile("index.html", {root: __dirname})
  res.sendFile("styles.css", {root: __dirname})
});



//GET CALL TO RETURN JSON THAT FORMATS NATURAL AND UNIX DATE
app.get('/:dateVal', function(req, res){

//REQUESTS DATA FOR DATE
var dateVal = req.params.dateVal;

//OPTIONS FOR FORMATTING DATE IN NATURAL DATE VIEW
//FIND IT HERE:
//https://docs.microsoft.com/en-us/scripting/javascript/date-and-time-strings-javascript
var dateFormattingOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

//FOR CONVERTION GO HERE: https://www.epochconverter.com/
if (isNaN(dateVal)){
  var naturalDate = new Date(dateVal);
  naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
  var unixDate = new Date(dateVal).getTime()/1000;
}
else{
  var unixDate = dateVal;
  var naturalDate = new Date(dateVal *1000);
  naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
}

//RESPONSE TO SEND
res.json({unix: unixDate, natural: naturalDate});
});



//LISTENS ON PORT 3000
app.listen(3000, function(){
  console.log("It's Working!!!")
})