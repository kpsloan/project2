var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var show = require("../models/show.js");

// Create all our routes and set up logic within those routes where required.
router.get("/members", function(req, res) {
  show.all(function(data) {
    var hbsObject = {
      shows: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/shows", function(req, res) {
  show.create([
    "name", "watched", "genre", "released", "rating"
  ], [
    req.body.name, req.body.watched, req.body.a.Genre, req.body.a.Released, req.body.a.imdbRating,
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/shows/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  show.update({
    watched: req.body.watched
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/shows/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  show.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
