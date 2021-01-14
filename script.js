var mysql = require("mysql");
var http = require("http");

// console.log("Hello World");

// document.getElementById("h1").innerHTML = "<p>This is a text</p>";

//how to connect to a database and show on console / web page
var local_dbhost = {
  host: "localhost",
  port: "3306",
  user: "newuser1",
  password: "12345",
  database: "cb12ptjs",
};

var remote_dbhost = {
  host: "ra1.anystream.eu",
  port: "5420",
  user: "cb12ptjs",
  password: "cb12ptjs",
  database: "cb12ptjs",
};

// var sql = "SELECT * FROM `users`;";
var sql2 = "SELECT * FROM `customers`;";
// var sql3 =
//   "INSERT INTO customers (id, firstname, lastname, email, telephone) VALUES ('8', 'Nikos', 'Galanopoulos', 'nick13ga@windowslive.com', '+306948729980' )";
//make a connection to the database server
//var connection = mysql.createConnection(local_dbhost);
var connection = mysql.createConnection(remote_dbhost);

//check if conneciton is ok
// console.log(connection);

connection.connect(function (err) {
  //Houston we have a problem
  if (err) {
    console.log("Error connecting");
    console.log(err);
  }
  //Houston we dont have a problem
  //data are coming
  else {
    console.log("Η συνδεση πραγματοποιειται...");
    connection.query(sql2, function (ee, result, fields) {
      //data are finally here!!!
      // console.log("result: ", result);
      // Object.keys(result).forEach(function (key) {
      //   var row = result[key];
      //   console.log(row.firstName);
      //   console.log(row.lastName);
      //   console.log(row.telephone);
      // });

      var data0 = Object.assign({}, result[7]);
      console.log(data0);
      var server = http
        .createServer(function (request, response) {
          response.writeHead(404, {});
          // response.write("You didn't make it!!!!");
          // response.write(Object.keys(data0).toString());
          // response.write(Object.values(data0).toString());
          response.write(
            `<p>id:${data0.id}</p> <p>Firstname:${data0.firstname}</p> <p>Lastname:${data0.lastname}</p> <p>Email: ${data0.email}</p> <p>Telephone: ${data0.telephone}</p> `
          );
          response.end();
        })
        .listen(8000);
    });
    // console.log("1.after query");
    connection.end();
  }
  //console.log("2.outside if inside connect");
  // connection.end();
});
//connection.end();
