var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true
      },
    link: {
      type: String,
      unique: true
      },
    author: {
      type: String,
    },
    saved: {
      type: Boolean,
      default: false
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;