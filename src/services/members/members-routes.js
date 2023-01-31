module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const firebaseService = require('./members-controller');
    require("../../auth/auth-routes")(app);
    require("../../services/books/books-routes")(app);
    require("../../services/authors/authors-routes")(app);
    require("../../services/genres/genres-routes")(app);
    require("../../services/loans/loans-routes")(app);
    require("../../services/reservations/reservations-routes")(app);

    router.get("/members", (req, res) => {
        // #swagger.tags = ['Members']
        // #swagger.summary = 'Get all members'
        // #swagger.description = 'This endpoint retrieves all the members in the database'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        firebaseService.getMembers()
            .then((members) => {
                res.status(200).json(members);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.get("/members/:id", (req, res) => {
        // #swagger.tags = ['Members']
        // #swagger.summary = 'Get a member by ID'
        // #swagger.description = 'This endpoint retrieves a member based on the provided ID'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        const memberId = req.params.id;
        firebaseService.getMember(memberId)
            .then((member) => {
                res.status(200).json(member);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });


    router.post("/addmember", (req, res) => {
        // #swagger.tags = ['Members']
        // #swagger.summary = 'Add a new member'
        // #swagger.description = 'This endpoint adds a new member to the database'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let member = {
            Name: req.body.Name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        }
        firebaseService.addMember(member)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.put("/updatemember/:memberId", (req, res) => {
        // #swagger.tags = ['Members']
        // #swagger.summary = 'Update a member'
        // #swagger.description = 'This endpoint updates a member in the database based on the provided ID'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let memberId = req.params.memberId;
        let updatedMember = req.body;
        firebaseService.updateMember(memberId, updatedMember)
            .then(() => {
                res.status(200).json({
                    message: "Member updated successfully"
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: "Error updating member",
                    error
                });
            });
    });

    router.delete("/deletemember/:memberId", (req, res) => {
        // #swagger.tags = ['Members']
        // #swagger.summary = 'Deletes a member by ID'
        // #swagger.description = 'Deletes a member from the database by providing the member ID'
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        const memberId = req.params.memberId;
        firebaseService.deleteMember(memberId)
            .then(() => {
                res.status(200).json({
                    message: "Member deleted successfully"
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    // -- To declare the prefix path of your API service
    app.use("/libraryapi/api/v1/members", router);

}