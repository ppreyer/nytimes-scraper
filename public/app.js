// Grab the articles from server as a json

// $.getJSON("/articles", function(data) {
//   for (var i = 0; i < data.length; i++) {
//     $("#articles").append("<p data-id='" + 
//       data[i]._id + "'>" + 
//       data[i].title + "<br />" +
//       data[i].link + "</p>" + "<button data-id='" + 
//       data[i]._id + "'>Save Article</button>");
//   }
// });

// // get the saved articles from server as a json

// $.getJSON("/saved", function(data) {
//   for (var i = 0; i < data.length; i++) {
//     $("#saved").append("<p data-id='" + 
//       data[i]._id + "'>" + 
//       data[i].title + "<br />" +
//       data[i].link + "</p>" + "<button>Save Article</button>");
//   }
// });

// post saved article from client to server
$(".saved").one("click", function() {
  var articleId = $(this).attr("id");
  console.log("ID", articleId);
  $.ajax({
    method: "POST",
    url: "/saved/" + articleId
  });
});

// get request to retrieve info about clicked article from server
$(".comment").one("click", function() {
  $("#notes").empty();
  var articleId = $(this).attr("id");
  console.log("ID", articleId);
  $.ajax({
    method: "GET",
    url: "/articles/" + articleId
  })
    .then(function(data) {
            // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
    });
});


