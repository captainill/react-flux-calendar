var path = require('path');
var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('listening on 3000');
});