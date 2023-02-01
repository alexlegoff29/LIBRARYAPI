const firestore = require('../../config/firebase-config');

exports.getbooks = async () => {
    let booksSnapshot = await firestore.collection("books").get();
    let books = booksSnapshot.docs.map(async book => {
      let bookData = book.data();
      
      let authorId = bookData['Author id'];
      let authorSnapshot = await firestore.collection("authors").doc(authorId).get();
      let authorData = authorSnapshot.data();
      
      let genreId = bookData['Genres id'];
      let genreSnapshot = await firestore.collection("genres").doc(genreId).get();
      let genreData = genreSnapshot.data();

      let reservationId = bookData['Reservation id'];
      let reservationSnapshot = await firestore.collection("reservations").doc(reservationId).get();
      let reservationData = reservationSnapshot.data();

      let memberId = reservationData['Member id'];
      let memberSnapshot = await firestore.collection("members").doc(memberId).get();
      let memberData = memberSnapshot.data();
      
      return {
        Title: bookData.Title,
        Author: {
            Name: authorData.Name,
            Birth: authorData['Date of birth'],
            Death: authorData['Date of death'],
        },
        Genre: {
          Name: genreData.Name,
          Description: genreData.Description
        },
        Reservation: {
            Date: reservationData['Reservation date'],
            Member: {
                Name: memberData.Name,
                Email: memberData['email'],
                PhoneNomber: memberData['phoneNumber']
            }
        }
      }
    });
    return Promise.all(books);
}

exports.getBookid = async (bookId) => {
    let bookSnapshot = await firestore.collection("books").doc(bookId).get();
    let bookData = bookSnapshot.data();
    return bookData;
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