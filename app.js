var express = require("express");
var app = express();
var todo1=require('./controller/page');

// set up tempplate engine
app.set('view engine','ejs');

//firing function
todo1(app);

//static files

app.use(express.static('./assets'));

//locoalhost:3000/assets/style.css
app.listen(5000);
console.log("3000 is the port number");
