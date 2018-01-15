// get route to trigger scrape route on server
$("#scrape").on("click", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  });
});

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
  $(".modal-title").empty();
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
   $("#addnote").val("");
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
      $("#notesection").append(`<p class="noteremove" id="${data.comments._id}">${data.comments.body}<span><button class= "btn btn-danger delete" id="${data.comments._id}" type="submit">Delete Note</button></span></p>`)
    });
});

// get request to delete comment data for specific article
$(document).on("click", ".delete", function() {
  console.log("button click");
  var commentId = $(this).attr("id");
  console.log("commentID", commentId);
  $.ajax({
    method: "DELETE",
    url: "/delete/" + commentId
  })
    .done(function(data) {
      console.log("server data", data);
      $(".noteremove").remove();
    });
});


