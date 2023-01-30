const firestore = require('../../config/firebase-config');

exports.getGenres = async () => {
    let genresSnapshot = await firestore.collection("genres").get();
    let genres = genresSnapshot.docs.map(genre => {
        return {
            Name: genre.data().Name,
            Description: genre.data().Description
        }
    });
    return genres;
}

exports.addGenre = async (genre) => {
    try {
        let newGenreRef = await firestore.collection("genres").add(genre);
        console.log("Genre added with ID: ", newGenreRef.id);
    } catch (error) {
        console.log("Error adding genre: ", error);
    }
}

exports.updateGenre = async (genreId, updatedGenre) => {
    try {
        let genreRef = firestore.collection("genres").doc(genreId);
        await genreRef.update(updatedGenre);
        console.log('Genre with ID ${genreId} updated successfully');
    } catch (error) {
        console.log('Error updating genre with ID ${genreId}: ', error);
    }
}

exports.deleteGenre = async (genreId) => {
    try {
        await firestore.collection("genres").doc(genreId).delete();
        console.log("Genre deleted successfully");
    } catch (error) {
        console.log("Error deleting genre: ", error);
    }
}