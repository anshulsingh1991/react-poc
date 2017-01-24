var express = require('express'),
  app = express(),
  http = require('http'),
  fs = require("fs"),
  url = 'mongodb://root:root@ds011735.mlab.com:11735/chat_windbag_app',
  MongoClient = require('mongodb').MongoClient;

//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('port', 4400);

//method to fetch messages form db
var getMessages = function(selector, cb) {
  MongoClient.connect(url, function (err, db) {
    db.collection('chat_msg').find().sort({"createdOn": 1}).toArray(cb);
  });
}

//method to fetch notifications form db
var getNotifications = function(selector, cb) {
  MongoClient.connect(url, function (err, db) {
    db.collection('pending_chat').find().sort({"createdOn": 1}).toArray(cb);
  });
}

//api to list all messages
app.get('/api/listAllMessages', function (req, res, next) {
  // get the messages
  getMessages("", function(err, data){
    if (err) {
      console.log(err);
      return res.end("server error.");
    }
    else {
      console.log("Fetched messages from db.");
      return res.json(data);
    }
  });
});

//api to list all notifications
app.get('/api/listAllNotifications', function (req, res, next) {
  // get the notifications
  getNotifications("", function(err, data){
    if (err) {
      console.log(err);
      return res.end("server error.");
    }
    else {
      console.log("Fetched notifications from db.");
      return res.json(data);
    }
  });
});

//server
var serve = http.createServer(app);
serve.listen(app.get('port'), function () {
  console.info('Serve is running on port ' + app.get('port'));
});
