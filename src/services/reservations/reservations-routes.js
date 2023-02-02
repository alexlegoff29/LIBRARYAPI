module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const firebaseService = require('./reservations-contoller');
    const jwtMiddleware = require("../../auth/jwt-middleware");
    
    router.get("/getreservations", jwtMiddleware.checkJwtTokenMiddleware, (req, res) => {
        // #swagger.tags = ['Reservations']
        // #swagger.description = 'Get all the reservations from the database'
        // #swagger.summary = 'Get all reservations'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        firebaseService.getReservations()
            .then((reservations) => {
                res.status(200).json(reservations);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.post("/addreservation", jwtMiddleware.checkJwtTokenMiddleware, (req, res) => {
        // #swagger.tags = ['Reservations']
        // #swagger.description = 'Add a reservation to the database'
        // #swagger.summary = 'Add reservation'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let reservation = {
            "Book id": req.body["Book id"],
            "Member id": req.body["Member id"],
            "Reservation date": req.body["Reservation date"]
        }
        firebaseService.addReservation(reservation)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.put("/updatereservation/:reservationId", jwtMiddleware.checkJwtTokenMiddleware, (req, res) => {
        // #swagger.tags = ['Reservations']
        // #swagger.description = 'Update a reservation in the database'
        // #swagger.summary = 'Update reservation'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let reservationId = req.params.reservationId;
        let updatedReservation = req.body;
        firebaseService.updateReservation(reservationId, updatedReservation)
            .then(() => {
                res.status(200).json({
                    message: "Reservation updated successfully"
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: "Error updating reservation",
                    error
                });
            });
    });

    router.delete("/deletereservation/:reservationId", jwtMiddleware.checkJwtTokenMiddleware, (req, res) => {
        // #swagger.tags = ['Reservations']
        // #swagger.description = 'Delete a reservation from the database'
        // #swagger.summary = 'Delete reservation'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        const reservationId = req.params.reservationId;
        firebaseService.deleteReservation(reservationId)
            .then(() => {
                res.status(200).json({
                    message: "Reservation deleted successfully"
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    // -- To declare the prefix path of your API service
    app.use("/libraryapi/api/v1/reservations", router);

}