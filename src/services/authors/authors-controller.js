const firestore = require('../../config/firebase-config');

exports.getauthors = async () => {
    let authorsSnapshot = await firestore.collection("authors").get();
    let authors = authorsSnapshot.docs.map(author => {
        return {
            Birth: author.data()["Date of birth"],
            Death: author.data()["Date of death"],
            Name: author.data().Name
        }
    });
    return authors;
}

exports.addauthor = async (author) => {
    try {
        let newAuthorRef = await firestore.collection("authors").add(author);
        console.log("Author added with ID: ", newAuthorRef.id);
    } catch (error) {
        console.log("Error adding author: ", error);
    }
}

exports.updateauthor = async (authorId, updatedAuthor) => {
    try {
        let authorRef = firestore.collection("authors").doc(authorId);
        await authorRef.update(updatedAuthor);
        console.log("Author with ID ${authorId} updated successfully");
    } catch (error) {
        console.log("Error updating author with ID ${authorId}:", error);
    }
}

exports.deleteAuthor = async (authorId) => {
    try {
        await firestore.collection("authors").doc(authorId).delete();
        console.log("Author deleted successfully");
    } catch (error) {
        console.log("Error deleting author: ", error);
    }
}