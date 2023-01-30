const firestore = require('../../config/firebase-config');

exports.getbooks = async () => {
    let booksSnapshot = await firestore.collection("books").get();
    let books = booksSnapshot.docs.map(book => {
        return {
            Title: book.data().Title,
            Author: book.data().Author
        }
    });
    return books;
}


exports.addbook = async (book) => {
    try {
        let newBookRef = await firestore.collection("books").add(book);
        console.log("Book added with ID: ", newBookRef.id);
    } catch (error) {
        console.log("Error adding book: ", error);
    }
}

exports.updatebook = async (bookId, updatedBook) => {
    try {
        let bookRef = firestore.collection("books").doc(bookId);
        await bookRef.update(updatedBook);
        console.log(`Book with ID ${bookId} updated successfully`);
    } catch (error) {
        console.log(`Error updating book with ID ${bookId}: `, error);
    }
}

exports.deleteBook = async (bookId) => {
    try {
        await firestore.collection("books").doc(bookId).delete();
        console.log("Book deleted successfully");
    } catch (error) {
        console.log("Error deleting book: ", error);
    }
}