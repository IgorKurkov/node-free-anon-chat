'use strict';

module.exports = function(app) {
  var chat = require('../controllers/chatController');

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  // app.route(`/`).get(function (req, res) { 
  //   res.sendFile(__dirname + '/admin.html'); 
  //  });

  app.route(`/posts`).get(chat.getAllPosts).post(chat.createPost);
  app.route(`/delete`).post(chat.deletePost);

};
