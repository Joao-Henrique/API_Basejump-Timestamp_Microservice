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

//SEND HTML AND CSS TO THE CLIENT SIDE
app.get('/', function(req, res){
  res.sendFile("index.html", {root: __dirname})
  res.sendFile("styles.css", {root: __dirname})
});

//GET CALL TO RETURN JSON THAT FORMATS NATURAL AND UNIX DATE
app.get('/:dateValue', function(req, res){

//REQUESTS DATA FOR DATE
var dateValue = req.params.dateValue;

//OPTIONS FOR FORMATTING DATE IN NATURAL DATE VIEW
//FIND IT HERE:
//https://docs.microsoft.com/en-us/scripting/javascript/date-and-time-strings-javascript
var dateFormattingOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

//MAIN LOGIC TO EVALUATE RECEIVED DATA AND SEND CORRECT RESPONSE
//FOR CONVERTION GO HERE: https://www.epochconverter.com/
if (isNaN(dateValue)){
  var naturalDate = new Date(dateValue);
  if(!isNaN(naturalDate)){
    naturalDate = naturalDate.toLocaleDateString("en-us",    dateFormattingOptions);
    var unixDate = new Date(dateValue).getTime()/1000; 
  } else{
    naturalDate = null;
    var unixDate = null;
  }
}
else{
  var unixDate = dateValue;
  if(!isNaN(unixDate)){
    var naturalDate = new Date(dateValue *1000);
    naturalDate = naturalDate.toLocaleDateString("en-us",   dateFormattingOptions);
  } else {
    naturalDate = null;
    var unixDate = null;
  }
}

//RESPONSE TO SEND
res.json({unix: unixDate, natural: naturalDate});
});

//LISTENS ON PORT 3000
app.listen(8080 || process.env.port, function(){
  console.log("YOUR SERVER IS WORKING!")
})