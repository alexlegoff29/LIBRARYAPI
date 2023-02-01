const firestore = require('../../config/firebase-config');
const booksController = require('../books/books-controller');


exports.getLoans = async () => {
    let loansSnapshot = await firestore.collection("loans").get();
    let loans = loansSnapshot.docs.map(async loan => {
      let loanData = loan.data();
      let bookId = loanData['Book id'];
      let bookSnapshot = await firestore.collection("books").doc(bookId).get();
      let bookData = bookSnapshot.data();
      let memberId = loanData['Member id'];
      let memberSnapshot = await firestore.collection("members").doc(memberId).get();
      let memberData = memberSnapshot.data();
      
      return {
        Book: {
            Title: bookData.Title,
            Author: bookData.Author
        },
        DueDate: loanData['Due date'],
        LoanDate: loanData['Loan date'],
        Member: {
          Name: memberData.Name,
          Email: memberData['email'],
          PhoneNumber: memberData['phoneNumber']
        }
      }
    });
    return Promise.all(loans);
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