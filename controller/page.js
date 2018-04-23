var bodyparser=require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds253889.mlab.com:53889/todoapp');

var urlencoded = bodyparser.urlencoded({extended:false});

var Artist = new mongoose.Schema({
  name:String,
  Description:String,
  Years_active:String,
  artist:String,
  aname:String,
  release_date:String,
  albumid:String,
  tname:String,
  playtime:String
});


var Artists= mongoose.model('Artists',Artist);

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
  res.render('page2',{todos : data});
});

});

app.get('/delete',function(req,res){
  var removeQuery = Artists.remove({id : req.params.id });
  removeQuery.exec();
});

app.post('/page1',function(req,res){
  var newTodo = Artists({
    name:req.body.artist_name,
    Description:req.body.description,
    Years_active:req.body.years_active,
    artist:req.body.artist_name,
    aname:req.body.name,
    release_date:req.body.Date,
    albumid:req.body.name,
    tname:req.body.tname,
    playtime:req.body.time
  }).save(function(err,data){
  if (err) throw err;
});

});

};
