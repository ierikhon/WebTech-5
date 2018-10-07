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

module.exports = router;
