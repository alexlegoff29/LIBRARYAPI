module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const firebaseService = require('./authors-controller');

    router.get("/getauthors", (req, res) => {
        // #swagger.tags = ['Authors']
        // #swagger.description = 'Get all authors from the database'
        // #swagger.summary = 'Get authors'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        firebaseService.getauthors()
            .then((authors) => {
                res.status(200).json(authors);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.post("/addauthor", (req, res) => {
        // #swagger.tags = ['Authors']
        // #swagger.description = 'Add an author to the database'
        // #swagger.summary = 'Add author'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let author = {
            Name: req.body.Name,
            "Date of birth": req.body["Date of birth"],
            "Date of death": req.body["Date of death"],
        }
        firebaseService.addauthor(author)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.put("/updateauthor/:authorId", (req, res) => {
        // #swagger.tags = ['Authors']
        // #swagger.description = 'Update an author in the database'
        // #swagger.summary = 'Update author'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let authorId = req.params.authorId;
        let updatedAuthor = req.body;
        firebaseService.updateauthor(authorId, updatedAuthor)
            .then(() => {
                res.status(200).json({
                    message: "Author updated successfully"
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: "Error updating author",
                    error
                });
            });
    });

    router.delete("/deleteauthor/:authorId", (req, res) => {
        // #swagger.tags = ['Authors']
        // #swagger.description = 'Delete an author from the database'
        // #swagger.summary = 'Delete author'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        const authorId = req.params.authorId;
        firebaseService.deleteAuthor(authorId)
            .then(() => {
                res.status(200).json({
                    message: "Author deleted successfully"
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    // -- To declare the prefix path of your API service
    app.use("/libraryapi/api/v1/authors", router);

}