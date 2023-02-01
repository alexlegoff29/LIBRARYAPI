const firestore = require('../../config/firebase-config');

exports.getReservations = async () => {
    let reservationsSnapshot = await firestore.collection("reservations").get();
    let reservations = reservationsSnapshot.docs.map(reservation => {
        return {
            BookTitle: reservation.data()['Book title'],
            MemberName: reservation.data()['Member name'],
            ReservationDate: reservation.data()['Reservation date']
        }
    });
    return reservations;
}
exports.getReservations = async () => {
    let reservationsSnapshot = await firestore.collection("reservations").get();
    let reservations = reservationsSnapshot.docs.map(async reservation => {
      let reservationData = reservation.data();
      
      let bookId = reservationData['Book id'];
      let bookSnapshot = await firestore.collection("books").doc(bookId).get();
      let bookData = bookSnapshot.data();
      
      let memberId = reservationData['Member id'];
      let memberSnapshot = await firestore.collection("members").doc(memberId).get();
      let memberData = memberSnapshot.data();

      let authorId = bookData['Author id'];
      let authorSnapshot = await firestore.collection("authors").doc(authorId).get();
      let authorData = authorSnapshot.data();
      
      return {
        Book: {
            Title: bookData.Title,
            Author: {
                Name: authorData.Name,
                Birth: authorData['Date of birth'],
                Death: authorData['Date of death']
            }
        },
        Date: reservationData['Reservation date'],
        Member: {
          Name: memberData.Name,
          Email: memberData['email'],
          PhoneNumber: memberData['phoneNumber']
        }
      }
    });
    return Promise.all(reservations);
}

exports.addReservation = async (reservation) => {
    try {
        let newReservationRef = await firestore.collection("reservations").add(reservation);
        console.log("Reservation added with ID: ", newReservationRef.id);
    } catch (error) {
        console.log("Error adding reservation: ", error);
    }
}

exports.updateReservation = async (reservationId, updatedReservation) => {
    try {
        let reservationRef = firestore.collection("reservations").doc(reservationId);
        await reservationRef.update(updatedReservation);
        console.log("Reservation with ID ${reservationId} updated successfully");
    } catch (error) {
        console.log("Error updating reservation with ID ${reservationId}: ", error);
    }
}

exports.deleteReservation = async (reservationId) => {
    try {
        await firestore.collection("reservations").doc(reservationId).delete();
        console.log("Reservation deleted successfully");
    } catch (error) {
        console.log("Error deleting reservation: ", error);
    }
}