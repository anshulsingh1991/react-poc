var express = require('express'),
  app = express(),
  http = require('http'),
  bcrypt = require('bcryptjs'),
  fs = require("fs"),
  url = 'mongodb://root:root@ds011735.mlab.com:11735/chat_windbag_app',
  qs = require('querystring'),
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

var getUserDetails = function(selector1, selector2, cb) {
  MongoClient.connect(url, function (err, db) {
    db.collection('user_info').find({ "email" : selector1 }).sort({"createdOn": 1}).toArray(cb);
  });
}

//api to get user details and login if correct
app.post('/api/login', function (req, res, next) {
  var body = "", email = "", password = "";
  req.on('data', function (param) {
    body = JSON.parse(param);
  });
  req.on('end',function(){
    email =  body.email;
    password = body.password;
    // get the messages
    getUserDetails(email, password, function(err, user){
      if (err) {
        console.log(err);
        return res.end("server error.");
      }
      else {
        if(user.length != 0) {
          if(bcrypt.compareSync(password, user[0].password)) {
            console.log("Fetched user from db : " + user);
            res.status(200).json({
              message: 'Welcome to the project-name api'
            });
          }
          else {
            console.log("Detail mismatched");
            res.status(303);
            return res.end();
          }
        }
        else {
          console.log("No user found.");
          res.status(404);
          return res.end();
        }
      }
    });
  });
});

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
