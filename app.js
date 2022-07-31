var express=require("express");
var bodyParser=require("body-parser");
const PORT = process.env.PORT || 5000

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Equinoxe');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/add', function(req,res){
	var Name = req.body.name;
	var Email =req.body.email;
	var Number = req.body.number;
	var Txt =req.body.txt;

	var data = {
		"name": Name,
		"email":Email,
		"number":Number,
		"txt":Txt
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('msg-send.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(PORT, () => console.log(`Listening on ${ PORT }`))


console.log("server running");
