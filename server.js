var express = require("express");
var session = require("express-session");
var PORT = process.env.PORT || 8080;
var passport = require("passport");
var app = express();
var app1 = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/showsController.js");
require("./controllers/html-routes.js")(app);
require("./controllers/api-routes.js")(app);
app.use(routes);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
