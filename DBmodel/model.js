var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/XMLwork', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongodb connected")
});
var xmlData = new mongoose.Schema({
    name:String,
    content:String
  })
var model = mongoose.model("xmlData",xmlData)

module.exports=model