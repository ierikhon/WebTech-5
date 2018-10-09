var express = require('express');
var router = express.Router();

var booksMas = [];
var books = require('../booksStart');
books = JSON.parse(JSON.stringify(books));

for (let key in books)
{
    books[key].ind = Number(key);
    booksMas.push(books[key]);
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('books', {jfile: booksMas});
});
router.get("/:num", function(req, res, next) {
    const id = req.params.num;
    res.render('bookInfo', {bookid: id});
});

module.exports = router;