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
mongoose.connect("mongodb://localhost/news-scraper", {
  useMongoClient: true
});

// routes

// get route to find all of the articles
app.get("/", function(req, res) {
  db.Article
    .find({}, function(err, data) {
      res.render("index", {articles: data});
    })
})

// get route to scrape nytimes
app.get("/scrape", function(req, res) {
  axios.get("http://www.nytimes.com")
    .then(function(response) {
      var $ = cheerio.load(response.data);
      var result = {};
    $("h2.story-heading")
      .each(function(i, element) {
        result.title = $(this).children().text();
        result.link = $(this).children().attr("href");

      db.Article
        .create(result)
        .then(function(article) {
          console.log(article);
          res.send("Scrape Complete");
          res.redirect("/");
        })
        .catch(function(err) {
          res.send(err);
        });
      });
    });
});

// get route to grab all of the articles from the database and send to client
app.get("/articles", function(req, res) {
  db.Article
    .find({})
    .then(function(articles) {
      console.log("ID", articles._id)
      return res.json(articles);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// post route to save clicked article to mongo and set saved status to true
app.post("/saved/:id", function(req, res) {
  db.Article
    .findByIdAndUpdate(req.params.id, {$set: {saved: true}}, function(err, data) {
      res.redirect("/");
  })
})

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

// get route to find article that was clicked to add comment
app.get("/articles/:id", function(req, res) {
  console.log("I got here");
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

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
