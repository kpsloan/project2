// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var express = require("express");
var router = express.Router();
var show = require("../models/show.js")

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = function (req, res, next){
  
  if (req.user) {
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/");
}

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/landings.html"));
  });

  // app.get("/login", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/landings.html"));
  // });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    show.all(function(data) {
      var hbsObject = {
        shows: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  
  });
  // app.get("/signup", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });
  // app.get("/signup", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   else res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

};
