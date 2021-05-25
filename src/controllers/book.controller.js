var { generateToken } = require("../middleware/authorize");

var { runQuery } = require("../database/database");

exports.addBook = async function (req, res) {
  const response = await runQuery(
    `insert into book_master (name, author, release_date) values ('${req.body.name}', '${req.body.author}', '${req.body.releaseDate}'); select * from book_master where name = '${req.body.name}' ORDER BY 'book_id' DESC;`
  );
  const bookData = response[0];

  await runQuery(
    `insert into book_user_map (book_id, user_id) values ('${bookData.book_id}', '${req.headers.user_id}');`
  );

  return res.send({
    status: true,
    message: "success",
    book_id: bookData.book_id,
  });
};

exports.editBook = async function (req, res) {
  const response = await runQuery(
    `update book_master set name = '${req.body.name}',  author='${req.body.author}', release_date='${req.body.releaseDate}' where book_id = ${req.body.bookId}; select * from book_master where book_id = ${req.body.bookId};`
  );
  const bookData = response[0];

  return res.send({
    status: true,
    message: "success",
    book_id: bookData.book_id,
    name: bookData.name,
    author: bookData.author,
    releaseDate: bookData.release_date,
  });
};

exports.getBooks = async function (req, res) {
  const response = await runQuery(
    `select user_id as userId, username as name, email from login where user_id = ${req.headers.user_id}`
  );
  const userData = response[0];

  const booksData = await runQuery(
    `select book_id as bookId, name, author, release_date as releaseDate from book_master where book_id in (SELECT book_id FROM book_user_map where user_id = ${req.headers.user_id})`
  );

  return res.send({
    status: true,
    message: "success",
    user_details: userData,
    books: booksData,
  });
};
