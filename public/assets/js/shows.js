// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-sleep").on("click", function(event) {
    var id = $(this).data("id");
    var newWatch = $(this).data("newwatch");

    var newWatchState = {
      watched: newWatch
    };

    // Send the PUT request.
    $.ajax("/api/shows/" + id, {
      type: "PUT",
      data: newWatchState
    }).then(
      function() {
        console.log("changed watched to", newWatch);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var xyz = $("#ca").val().trim();
    var queryURL = "https://www.omdbapi.com/?t="+xyz+"&apikey=trilogy";
    $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
 
            // $(".abc").append("<p>" + response.Title+"</p>"+"<p>" + response.Genre+"</p>"+"<p>"+response.Released+"</p>"+"<p>"+response.imdbRating+"</p>")
           
            var newShow = {
              name: response.Title+" "+ response.Genre.split(', ')[0]+" "+ response.Released+" "+ response.imdbRating,
              a: response,
              watched: $("[name=watched]:checked").val().trim(),
             
              
 
            };
            console.log(response);
    // Send the POST request.
    $.ajax("/api/shows", {
      type: "POST",
      data: newShow,
    }).then(
      function() {
        console.log("created new show");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
 });

  $(".delete-show").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/shows/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted show", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $('#assessment').on('click', function (event) {
    event.preventDefault();
    $('.modal').modal({
        dismissible: false,
        opacity: .5,
        inDuration: 300,
        outDuration: 200,
        startingTop: '50%',
        endingTop: '55%'
    });
    $('#modalAss').modal('open');
  
  });

  $('#leave').on('click', function (event) {
    event.preventDefault();
    $('#modalAss').modal('close');
    

});



});




