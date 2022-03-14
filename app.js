const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(express.json());

//connect to MongoDB
mongoose.connect(
  "mongodb+srv://softwaregrokkers:grokkerssoftware@cluster0.xa1km.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

//setup routes
app.use('/',require("./routes"));

//setup port
app.set('port', process.env.port || 3000)

//start server
app.listen(app.get("port"), function(){
	console.log("server running")
})
