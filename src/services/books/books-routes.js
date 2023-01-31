module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const firebaseService = require('./books-controller');

    router.get("/getbooks", (req, res) => {
        // #swagger.tags = ['Books']
        // #swagger.summary = "Get all books in the library"
        // #swagger.description = "This API endpoint retrieves all books in the library and returns a list of books in JSON format."
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        firebaseService.getbooks()
            .then((books) => {
                res.status(200).json(books);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.post("/addbook", (req, res) => {
        // #swagger.tags = ['Books']
        // #swagger.summary = "Add a new book to the library"
        // #swagger.description = "This API endpoint creates a new book in the library by sending a JSON payload in the request body."
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let book = {
            Title: req.body.Title,
            Author: req.body.Author
        }
        firebaseService.addbook(book)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });


    router.put("/updatebook/:bookId", (req, res) => {
        // #swagger.tags = ['Books']
        // #swagger.summary = "Update an existing book in the library"
        // #swagger.description = "This API endpoint updates an existing book in the library by sending a JSON payload in the request body."
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let bookId = req.params.bookId;
        let updatedBook = req.body;
        firebaseService.updatebook(bookId, updatedBook)
            .then(() => {
                res.status(200).json({
                    message: "Book updated successfully"
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: "Error updating book",
                    error
                });
            });
    });


    router.delete("/deletebook/:bookId", (req, res) => {
        // #swagger.tags = ['Books']
        // #swagger.summary = "Delete a book from the library"
        // #swagger.description = "This API endpoint deletes a book from the library."
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        const bookId = req.params.bookId;
        firebaseService.deleteBook(bookId)
            .then(() => {
                res.status(200).json({
                    message: "Book deleted successfully"
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });



    // -- To declare the prefix path of your API service
    app.use("/libraryapi/api/v1/books", router);

}