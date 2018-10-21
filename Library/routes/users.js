function responseOK(){
    return {
        "ok": true,
        "message": ""
    }
}

var express = require('express');
var router = express.Router();

var booksMas = [];
var newBM = [];
var books = require('../booksStart');
var emptyBook = require('../newBook');

emptyBook = JSON.parse(JSON.stringify(emptyBook));

books = JSON.parse(JSON.stringify(books));

for (let key in books)
{
    books[key].ind = Number(key);
    booksMas.push(books[key]);
}

/* GET users listing. */

router.delete("/return/:num([0-9]{1,})", function(req, res, next) {
    const id = req.params.num;

    booksMas[id]["stock"] = "Yes";
    booksMas[id]["datareturn"] = "";
    booksMas[id]["taken"]["pers"] = "";
    booksMas[id]["taken"]["date"] = "";

    res.json(responseOK());
    //next();
});

router.put("/save", function(req, res, next) {
    let newbookInfo = req.body;
    let bookInfo = {};
    bookInfo["name"] = newbookInfo["name"];
    bookInfo["author"] = newbookInfo["author"];
    bookInfo["datarel"] = newbookInfo["datarel"];
    bookInfo["datareturn"] = newbookInfo["datareturn"];
    bookInfo["stock"] = newbookInfo["stock"];
    bookInfo["taken"] = {};
    bookInfo["taken"]["pers"] = newbookInfo["taken"]["pers"];
    bookInfo["taken"]["date"] = newbookInfo["taken"]["date"];

    if (newbookInfo["id"] === booksMas.length)
        booksMas.append(bookInfo);
    else
        booksMas[newbookInfo["id"]] = bookInfo;
    res.json(responseOK());
    //next();
});

router.delete("/:num([0-9]{1,})", function(req, res, next) {
    const id = req.params.num;
    booksMas.splice(id, 1);
    res.json(responseOK());
    //next();
});

router.get('/', function(req, res, next) {
  res.render('books', {jfile: booksMas});
  //next();
});

router.post('/', function(req, res, next) {
    let newBookMas = [];
    let otherBookMas = [];
    for (let i in booksMas)
    {
        if (booksMas[i]["stock"] === "Yes")
            newBookMas.push(booksMas[i])
    }
    for (let i in booksMas)
    {
        if (booksMas[i]["stock"] === "No")
        {
            otherBookMas.push(booksMas[i]);
        }
    }
    otherBookMas.sort(function (a, b) {
        return new Date(a["datareturn"]).valueOf() - new Date(b["datareturn"]).valueOf();
    });
    for (let i in otherBookMas)
        newBookMas.push(otherBookMas[i]);
    booksMas = newBookMas;
    res.json(responseOK());
    //next();
});

router.get("/:num([0-9]{1,})", function(req, res, next) {
    const id = req.params.num;
    res.render('bookInfo', {book: booksMas[id], id: id});
    //next();
});
router.get("/new", function(req, res, next) {
    res.render('bookInfo', {book: emptyBook, id: booksMas.length});
});

module.exports = router;
