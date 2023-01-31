module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const firebaseService = require('./genres-controller');

    router.get("/getgenres", (req, res) => {
        // #swagger.tags = ['Genres']
        // #swagger.summary = 'Get all genres'
        // #swagger.description = 'This endpoint is used to retrieve all genres from the database.'
        firebaseService.getGenres()
            .then((genres) => {
                res.status(200).json(genres);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.post("/addgenre", (req, res) => {
        // #swagger.tags = ['Genres']
        // #swagger.summary = 'Add a new genre'
        // #swagger.description = 'This endpoint is used to add a new genre to the database.'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let genre = {
            Name: req.body.Name,
            Description: req.body.Description
        }
        firebaseService.addGenre(genre)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.put("/updategenre/:genreId", (req, res) => {
        // #swagger.tags = ['Genres']
        // #swagger.summary = 'Update a genre'
        // #swagger.description = 'This endpoint is used to update an existing genre in the database.'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let genreId = req.params.genreId;
        let updatedGenre = req.body;
        firebaseService.updateGenre(genreId, updatedGenre)
            .then(() => {
                res.status(200).json({
                    message: "Genre updated successfully"
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: "Error updating genre",
                    error
                });
            });
    });

    router.delete("/deletegenre/:genreId", (req, res) => {
        // #swagger.tags = ['Genres']
        // #swagger.summary = 'Delete a genre'
        // #swagger.description = 'This endpoint is used to delete a genre from the database.'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        const genreId = req.params.genreId;
        firebaseService.deleteGenre(genreId)
            .then(() => {
                res.status(200).json({
                    message: "Genre deleted successfully"
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    // -- To declare the prefix path of your API service
    app.use("/libraryapi/api/v1/genres", router);

}