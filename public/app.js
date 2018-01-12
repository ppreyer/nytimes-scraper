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

// get route to trigger scrape route on server
$("#scrape").on("click", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  });
});

// get route to trigger saved articles route on server
// $("#savedarticles").on("click", function() {
//   $.ajax({
//     method: "GET",
//     url: "/saved"
//   });
// });

// post unsaved article from client to server
$(document).on("click", ".unsave", function(e) {
  e.preventDefault();
  var articleId = $(this).attr("id");
  console.log("ID", articleId);
  $.ajax({
    method: "POST",
    url: "/unsaved/" + articleId
  });
});

// post saved article from client to server
$(document).on("click", ".saved", function(e) {
  e.preventDefault();
  var articleId = $(this).attr("id");
  console.log("ID", articleId);
  $.ajax({
    method: "POST",
    url: "/saved/" + articleId
  });
});

// get request to retrieve info about clicked article from server
$(".comment").on("click", function() {
  $("#notes").empty();
  var articleId = $(this).attr("id");
  console.log("ID", articleId);
  $.ajax({
    method: "GET",
    url: "/articles/" + articleId
  })
    .then(function(data) {
      console.log("I get here.", data);
      $(".modal-title").append(`<h2 id="${data._id}"> Article ID: ${data._id} </h2>`);
      $('.addnote').attr('id', `${data._id}`);
    });
});


// post request to submit comment data for specific article
$(".addnote").on("click", function() {
  console.log("button click");
  var articleId = $(".panel-title").attr("id");
  // console.log("Article ID", articleId);
  $.ajax({
    method: "POST",
    url: "articles1/" + articleId,
    data: { 
      body: $("#addnote").val()
    }
  })
    .then(function(err, data) {
      if (err) throw err;
      console.log("server data", data);
      $(".addnote").empty();
    });
   $("#titleinput").val("");
   $("#bodyinput").val(""); 
});

$(".addnote").on("click", function() {
  var articleId = $(this).attr("id");
  console.log("ID", articleId)
  $.ajax({
    method: "GET",
    url: "/articles/" + articleId
  })
    .then(function(data) {
      console.log("data", data);
      $("#notesection").append(`<p>${data.comments.body}</p>`)
    })
});

// post request to delete comment data for specific article
$("#notes").on("click", "#deletenote", function() {
  console.log("button click");
  var articleId = $("#deletenote").attr("data-id");
  console.log("Article ID", articleId);
  $.ajax({
    method: "POST",
    url: "articles2/" + articleId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .then(function(err, data) {
      if (err) throw err;
      console.log("server data", data);
      $("#notes").empty();
    });
   $("#titleinput").val("");
   $("#bodyinput").val(""); 
});


