var bodyparser=require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds253889.mlab.com:53889/todoapp');

var urlencoded = bodyparser.urlencoded({extended:false});

var Artist = new mongoose.Schema({
  name:String,
  Description:String,
  Years_active:String
});

var Albums = new mongoose.Schema({
  artist:String,
  name:String,
  release_date:String
});

var Tracks = new mongoose.Schema({
  albumid:String,
  name:String,
  playtime:String
});

var Artists= mongoose.model('Artists',Artist);
var Albums= mongoose.model('Albums',Albums);
var Tracks= mongoose.model('Tracks',Tracks);

module.exports = function(app){

app.use(bodyparser({extended:false}));

app.get('/music',function(req,res){
  res.render('home')
});

app.get('/page1',function(req,res){
  res.render('page1')
});

app.get('/page2',function(req,res){
  Artists.find({},function(err, data){
  if (err) throw err;
  console.log(data);
  res.render('page2',{todos : data});
});

});

app.post('/page1',function(req,res){
  var newTodo = Artists({
    name:req.body.artist_name,
    Description:req.body.description,
    Years_active:req.body.years_active
  }).save(function(err,data){
  if (err) throw err;});

  var newTodo = Albums({
    artist:req.body.artist_name,
    name:req.body.name,
    release_date:req.body.Date
  }).save(function(err,data){
  if (err) throw err;});

  var newTodo = Tracks({
    albumid:req.body.name,
    name:req.body.tname,
    playtime:req.body.time
  }).save(function(err,data){
  if (err) throw err;});
});



};
