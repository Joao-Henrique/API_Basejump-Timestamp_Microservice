var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");


var app= module.exports = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/dateValues/:dateVal', function(req, res, next){
var dateVal = req.params.dateVal;
res.json({unix: dateVal});
});



app.listen(3000, function(){
  console.log("still working ma frend!")
})