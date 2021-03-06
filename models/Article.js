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
    summary: {
      type: String
    },
    image: {
      type: String
    },
    saved: {
      type: Boolean,
      default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    comments:
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;   