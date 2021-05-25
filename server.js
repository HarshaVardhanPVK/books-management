var express = require("express");

const User = require("./src/controllers/user.controller");
const Book = require("./src/controllers/book.controller");

const { authorizeUser } = require("./src/middleware/authorize");

var app = express();
app.use(express.json());

app.post("/login", User.login);
app.post("/addbook", authorizeUser, Book.addBook);
app.post("/editbook", authorizeUser, Book.editBook);
app.get("/getBooks", authorizeUser, Book.getBooks);

const port = 5000;

var server = app.listen(port, function () {
  console.log("Server is running on port " + port);
});
