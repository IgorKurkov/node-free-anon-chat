const mongoose = require("mongoose");
const Post    = mongoose.model("Posts");

exports.getAllPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    err && res.send(err);
    res.json(posts);
  }).sort({ created: 1 });
};

exports.createPost = (req, res) => {
  let body = JSON.parse(req.body.value);
  const newPost = new Post(body);
  newPost.save((err, post) => {
    err && res.send(err);
    res.json(post);
  });
}

exports.deletePost = (req, res) => {
  let body = JSON.parse(req.body.value);
  console.log();
  Post.remove({ _id: body.id }, function(err, post) {
    err && res.send(err);
    console.log(post, { message: "Post successfully deleted" })
    res.json({ message: "Post successfully deleted" });
  });
}
