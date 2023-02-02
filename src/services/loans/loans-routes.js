module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const firebaseService = require('./loans-controller');
    const jwtMiddleware = require("../../auth/jwt-middleware");

    router.get("/getloans", jwtMiddleware.checkJwtTokenMiddleware, (req, res) => {
        // #swagger.tags = ['Loans']
        // #swagger.summary = "Get all loan information"
        // #swagger.description = "Retrieve all loan information from the database"
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        firebaseService.getLoans()
            .then((loans) => {
                res.status(200).json(loans);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.post("/addloan", jwtMiddleware.checkJwtTokenMiddleware, (req, res) => {
        // #swagger.tags = ['Loans']
        // #swagger.summary = "Add a new loan"
        // #swagger.description = "Add a new loan to the database"
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let loan = {
            BookId: req.body["Book id"],
            DueDate: req.body["Due date"],
            LoanDate: req.body["Loan date"],
            MemberId: req.body["Member id"]
        }
        firebaseService.addLoan(loan)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.put("/updateloan/:loanId", jwtMiddleware.checkJwtTokenMiddleware, (req, res) => {
        // #swagger.tags = ['Loans']
        // #swagger.summary = "Update a loan"
        // #swagger.description = "Update an existing loan in the database"
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let loanId = req.params.loanId;
        let updatedLoan = req.body;
        firebaseService.updateLoan(loanId, updatedLoan)
            .then(() => {
                res.status(200).json({
                    message: "Loan updated successfully"
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: "Error updating loan",
                    error
                });
            });
    });

    router.delete("/deleteloan/:loanId", jwtMiddleware.checkJwtTokenMiddleware, (req, res) => {
        // #swagger.tags = ['Loans']
        // #swagger.summary = "Delete a loan"
        // #swagger.description = "Delete an existing loan from the database"
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        const loanId = req.params.loanId;
        firebaseService.deleteLoan(loanId)
            .then(() => {
                res.status(200).json({
                    message: "Loan deleted successfully"
                });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    // -- To declare the prefix path of your API service
    app.use("/libraryapi/api/v1/loans", router);

}