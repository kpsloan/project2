// Set up MySQL connection.
var mysql = require("mysql");
require("dotenv").config();
var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
 connection = mysql.createConnection({
  'port': process.env.PORT || 3000,
  'host': process.env.HOST,
  'user': process.env.USERID,
  'password': process.env.PASSWORD,
  'database': process.env.DATABASE
})

}

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
