const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  console.log(req);

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      l;
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get("/", async (req, res)=> {
  //Write your code here
  return await res.status(300).json(books);
});

// get books using callback
public_users.get('/books',function (req, res) {

  const get_books = new Promise((resolve, reject) => {
      resolve(res.send(JSON.stringify({books}, null, 4)));
    });

    get_books.then(() => console.log("Promise for Task 10 resolved"));

});


// Get book details based on ISBN
// public_users.get("/isbn/:isbn", function (req, res) {
//   //Write your code here
//   let isbn = req.params.isbn;
//   return res.status(300).json(books[isbn]);
//   // return res.status(300).json({message: `Yet to be implemented ${req.params.isbn}`});
// });

public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const get_book = new Promise((resolve, reject) => {
      resolve(res.send(books[isbn]));
    });

    get_book.then(() => console.log("Promise for Task 11 resolved"));

});


// Get book details based on author

public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author;
  const filteredBooks = {};
  const get_book = new Promise((resolve,reject)=>{
    for (key in books) {
      books[key].author === author ? (filteredBooks[key] = books[key]) : null;
    }
    resolve(res.status(300).json({ BookByAuthor: filteredBooks }))
  })
  get_book.then(() => console.log("Promise for Task 13 resolved"));

});


// public_users.get("/author/:author", function (req, res) {
//   //Write your code here
//   const author = req.params.author;
//   const filteredBooks = {};
//   for (key in books) {
//     books[key].author === author ? (filteredBooks[key] = books[key]) : null;
//   }
//   res.status(300).json({ BookByAuthor: filteredBooks });
// });

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  const filteredBooks = {};
  for (key in books) {
    books[key].title === title ? (filteredBooks[key] = books[key]) : null;
  }
  res.status(300).json({ BookByTitle: filteredBooks });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const bookReview = books[isbn]["review"];
  return res.status(300).json({ bookReview });
});

module.exports.general = public_users;
