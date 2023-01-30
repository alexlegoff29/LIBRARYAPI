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