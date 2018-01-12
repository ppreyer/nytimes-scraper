var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: String,
  body: String,
  created: {
        type: Date,
        default: Date.now
    },
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;