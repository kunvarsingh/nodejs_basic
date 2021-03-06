// External module import via NPM manager------------------------
var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose  = require('mongoose');
var bcrypt = require('bcrypt');
var cors = require('cors');

// import routing files----------------------
var USER =require('./routes/userRout');
var EVENT=require('./routes/eventRoute');

app.use(bodyparser.urlencoded({ limit : '20mb', extended : false }));
app.use(bodyparser.json({ limit : '20mb', extended : false }));
app.use(cors());

// --------------------------------------MONGODB Connection--------------------------------------
mongoose.connect('mongodb://localhost:27017/digital_diaryDB', function(data,err){
	if(!err) console.log("Error to connect MONGODB :",err);
	console.log("MONGODB connection successfully:   mongodb://localhost:27017/digital_diaryDB");
});
// --------------------------------------END MONGODB Connection--------------------------------------


// --------------------------------------ROUTING for user module--------------------------------------
app.use('/user',USER);
app.use('/event', EVENT);

app.get('/',function(req,res){
  res.send({message :"Welcome Nurtre"});
});

app.listen(process.env.PORT || 9000,function(req,res){
  console.log("Server is started on: http://localhost:9000/");
})

module.exports = app;
