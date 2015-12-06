var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var request = require('request');
var FacebokGraph = require('./graphAPI');
var server_port =  process.env.PORT || 8080;
var server_ip_address = process.env.IP || '127.0.0.1';
var engine = require('ejs-locals');
var accessToken = 'CAACEdEose0cBACjSWNLEIyHo1tL0gRMs1PNzgICsPuH4J6UIRUcbA0JXpGq8sVLZCtXJKCAfPnYsNUASyaYf74SZCpdilQWOhaNpgBvbFCZAiA8dV6e9M6JKQCU149j6MZAYJcZC8HYD47HH7C05jAm3WALlKsdq5ToEMGtCKpTMe0c4ZBdZAZCaaurBC4dfOhmAtnc9Q1xzMgZDZD';
var graphAPI = new FacebokGraph('v2.5');

app.engine('ejs',engine);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('port',server_port);
app.use(express.static(path.join(__dirname,'public')));

// set access token
graphAPI.setAuthToken(accessToken);

// examples
graphAPI.getMe('',function(statusCode,body,err){
  console.log('statuCode = ' + statusCode);
  console.log('body = ' + body);
});



app.get('/',function(req,res){
  graphAPI.api(
    '/me/albums',
    { fields : 'name,count,created_time' , limit: 1 },
    function(statusCode,body,err,apiUrl){
      res.send(body);
      res.end();
  });
});

http.createServer(app).listen(app.get('port'),function(res,req){
  console.log('Express Server runs on port ' + app.get('port'));
});
