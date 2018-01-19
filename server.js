var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
var MONGODB_URI = MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// routes

// get route to find all of the articles
app.get("/", function(req, res) {
  db.Article
    .find({}, null, {sort: {created: -1}}, function(err, data) {
      return res.render("index", {articles: data});
    });
});

// get route to scrape nytimes
app.get("/scrape", function(req, res) {
  axios.get("http://www.nytimes.com")
    .then(function(response) {
      var $ = cheerio.load(response.data);
      var result = {};
    $("article.story")
      .each(function(i, element) {
        result.title = $(this).find("h2.story-heading").text();
        result.link = $(this).find("a").attr("href");
        result.author = $(this).find("p.byline").text();
        result.summary = $(this).find("p.summary").text();
        result.image = $(this).find("div.thumb").children().attr("href");
      db.Article
        .create(result)
        .then(function(article) {
          // res.send("Scrape Complete");
          console.log("article contents", article);
          return res.refresh();
        })
        .catch(function(err) {
          res.send(err);
        });
      });
    });
});

// get route to grab all of the articles from the database and send to client
// app.get("/articles", function(req, res) {
//   db.Article
//     .find({})
//     .then(function(articles) {
//       console.log("ID", articles._id)
//       return res.json(articles);
//     })
//     .catch(function(err) {
//       res.send(err);
//     });
// });

// post route to save clicked article to mongo and set saved status to true
app.post("/saved/:id", function(req, res) {
  db.Article
    .findByIdAndUpdate(req.params.id, {$set: {saved: true}}, function(err, data) {
      res.redirect("/");
  });
});

// post route to save clicked article to mongo and set saved status to false
app.post("/unsaved/:id", function(req, res) {
  db.Article
    .findByIdAndUpdate(req.params.id, {$set: {saved: false}}, function(err, data) {
      res.redirect("/saved");
  });
});


// get route to find all the saved articles and send as json to client
app.get("/saved", function(req, res) {
  db.Article
  .find({
    saved: true
  })
    .then(function(data) {
      res.render("saved", {articles: data})
    })
    .catch(function(err) {
        res.send(err);
     });
});

// post route to find article to update it's comments array
app.post("/articles1/:id", function(req, res) {
  console.log("in articlesId", req.body);
  db.Comment
      .create(req.body)
      .then(function(comment) {
        console.log("new comment", comment);
        return db.Article.findByIdAndUpdate({_id: req.params.id}, {comments: comment._id}, {new: true});
      })
      .then(function(article) {
        console.log("updated article", article);
        res.json(article);
      })
      .catch(function(err){
        res.send(err);
      });
});

// get route to delete specific note
app.delete("/delete/:id", function(req, res) {
  console.log("i got here", req.params.id);
  db.Comment.findOneAndRemove({
    _id: req.params.id
  }, function(err, data) {
      console.log("here", data);
      if (err) throw err;
      res.json(data);
    });
});


// get route to find article that was clicked to add comment
app.get("/articles/:id", function(req, res) {
  db.Article.findOne({
    _id: req.params.id
  })
    .populate("comments").then(function(article) {
      console.log("Article", article);
      res.json(article);
    })
      .catch(function(err) {
        res.send(err);
      });
});

// post route to find article that was clicked to add comment
// app.post("/articles/:id", function(req, res) {
//   db.Article.findOne({
//     _id: req.params.id
//   })
//     .populate("comments").then(function(article) {
//       console.log("Article", article);
//       return res.json(article);
//     })
//       .catch(function(err) {
//         res.send(err);
//       });
// });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
