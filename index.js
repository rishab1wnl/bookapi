require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

//database
const database = require("./database/index");


const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publications");
const Bookmodel = require("./database/book");

//Initializing express
const shapeAI = express();

//configurations

shapeAI.use(express.json());

mongoose.connect( 
    process.env.MONGO_URL, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}
).then(()=>console.log("connection established!!!"));

shapeAI.get("/", async (req ,res)=>
{
   const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

shapeAI.get("/is/:isbn", async (req , res)=>
{
    const getSpecificBook = await BookModel.findOne({ISBN: req.parmas.isbn});

if(!getSpecificBook){
    return res.json({Error: `No book found for the ISBN of ${req.params.isbn}`,
});
}
return res.json({book: getSpecificBook });

});

shapeAI.get("/c/:category" , async (req , res) => {

const getSpecificBooks = await BookModel.findOne({category: req.params.category, });
if(!getSpecificBooks){
    return res.json({Error: `No book found for the category of ${req.params.category}`,
});
}
return res.json({books: getSpecificBooks });

} 
);

shapeAI.get("/author",(req, res)=>
{
    return res.json({ authors: database.authors});
});


shapeAI.get("/authors/:isbn", (req, res)=>{
    const getSpecificAuthors = database.authors.filter((author) => 
    author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthors.length === 0){
      return res.json ({error:`No author found for the book ${req.params.isbn}`,
     });
    }
return res.json({authors: getSpecificAuthors});



});


shapeAI.get("/publications", (req, res)=>
{
    return res.json({publications: database.publications});
}
);


shapeAI.post("book/new", async (req, res)=>
{
const {newBook} = req.body;

const addNewBook = BookModel.create(newBook);


return res.json ({ books: addNewBook, message: "Book was added!"});
});

shapeAI.post("/author/new", (req, res)=> 
{
    const {newAuthor} = req.body;

    database.authors.push(newBook);
    
    
    return res.json ({ authors: database.authors, message: "author was added!"}); 
});

shapeAI.put("/book/update/:isbn", (req, res)=>
{
database.books.forEach((book)=>
{
    if(book.ISBN === req.params.isbn)
    {
        book.title = req.body.bookTitle;
    return; 
   }
});

return res.json({book: database.books});
});


shapeAI.put("/book/author/update/:isbn", (req, res)=>
{
database.books.forEach((book)=>
{
    if(book.ISBN === req.params.isbn) return book.authors.push(req.body.newAuthor);
});

database.authors.forEach((author)=>{
if(author.id === req.body.newAuthor) return author.books.push(req.params.isbn);
});

return  res.json({books:database.books, 
authors:database.authors,
 message: "New author was added 🚀",
});
});

shapeAI.put("/publication/update/book/:isbn", (req , res)=>
{
//update the publication database 
database.publications.forEach((publication)=>
{
if (publication.id === req.body.pubId)
{
  return publication.books.push(req.params.isbn);
}
});


//update the book database
database.books.forEach((book)=>{
if (book.ISBN === req.params.isbn){
    book.publication = req.body.pubId;
    return;
}
});

return res.json({books: database.books, publications: database.publications,
 message: "Successfully updated publication",

});



});

shapeAI.delete("/boom/delete/:isbn", (req, res)=>
{

    const updatedBookDatabase = database.books.filter((book)=>
book.ISBN !== req.params.isbn
    );

    database.books = updatedBookDatabase;
    return res.json ({books: database.books});
});

shapeAI.delete("/book/delete/author/:isbn/:authorId", 
(req, res)=>{

database.books.forEach((book)=>
{
if (book.ISBN === req.params.isbn)
{
    const newAuthorList = book.authors.filter((author)=> author !== parseInt(req.params.authorId)
    );
book.authors = newAuthorList;
return;
}
});
database.authors.forEach((author)=>{
    if(author.id === parseInt(req.params.authorId))
    {
        const newBooksList = author.books.filter(
            (body) => book !== req.params.isbn);

author.books = newBooksList;
return;

    }
});

return res.json({message:"author was deleted!!!!!",
book: database.books,
 author: database.authors,
});
});

 shapeAI.delete("/publication/delete/book:isbn/:pubId", (req , res)=>
 {
database.publications.forEach((publication)=>
{
    if(publication.id === parseInt(req.params.pubId))
    {
 const newBooksList = publication.books.filter(
     (book)=> book !== req.params.isbn);
     publication.books = newBooksList;
     return;
}
});

database.books.forEach((book)=>
{
    if(book.ISBN === req.params.isbn)
    {
        book.publication = 0;
        return;
    }
});
return res.json({books: database.books, 
    publications: database.publications});

 });

shapeAI.listen(3000, () => console.log("Server Running 😎"));