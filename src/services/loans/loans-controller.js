const firestore = require('../../config/firebase-config');
const booksController = require('./books-controller');

exports.getLoans = async () => {
    let books = await booksController.getbooks();
    let loansSnapshot = await firestore.collection("loans").get();
    let loans = loansSnapshot.docs.map(loan => {
        let loanData = loan.data();
        let book = books.find(book => book.Id === loanData['Book id']);
        return {
            BookName: book ? book.Name : 'Unknown',
            DueDate: loan.data()['Due date'],
            LoanDate: loan.data()['Loan date'],
            MemberName: loan.data()['Member name']
        }
    });
    return loans;
}

exports.addLoan = async (loan) => {
    try {
        let newLoanRef = await firestore.collection("loans").add(loan);
        console.log("Loan added with ID: ", newLoanRef.id);
    } catch (error) {
        console.log("Error adding loan: ", error);
    }
}

exports.updateLoan = async (loanId, updatedLoan) => {
    try {
        let loanRef = firestore.collection("loans").doc(loanId);
        await loanRef.update(updatedLoan);
        console.log("Loan with ID ${loanId} updated successfully");
    } catch (error) {
        console.log("Error updating loan with ID ${loanId}: ", error);
    }
}

exports.deleteLoan = async (loanId) => {
    try {
        await firestore.collection("loans").doc(loanId).delete();
        console.log("Loan deleted successfully");
    } catch (error) {
        console.log("Error deleting loan: ", error);
    }
}