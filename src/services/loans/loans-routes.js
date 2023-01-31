module.exports = app => {
    const express = require('express');
    const router = express.Router();
    const firebaseService = require('./loans-controller');

    router.get("/getloans", (req, res) => {
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

    router.post("/addloan", (req, res) => {
        // #swagger.tags = ['Loans']
        // #swagger.summary = "Add a new loan"
        // #swagger.description = "Add a new loan to the database"
        /* #swagger.security = [{
                "bearerAuth": []
        }] */
        let loan = {
            BookName: req.body.BookName,
            DueDate: req.body.DueDate,
            LoanDate: req.body.LoanDate,
            MemberName: req.body.MemberName
        }
        firebaseService.addLoan(loan)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    });

    router.put("/updateloan/:loanId", (req, res) => {
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

    router.delete("/deleteloan/:loanId", (req, res) => {
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