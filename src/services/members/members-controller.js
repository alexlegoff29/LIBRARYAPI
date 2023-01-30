const firestore = require('../../config/firebase-config');


exports.getMembers = async () => {
    let membersSnapshot = await firestore.collection("members").get();
    let members = membersSnapshot.docs.map(member => {
        return {
            Name: member.data().Name,
            email: member.data().email,
            phoneNumber: member.data().phoneNumber,
            address: member.data().address,
            uid: member.data().uid
        }
    });
    return members;
}

exports.getMember = async (memberId) => {
    let memberSnapshot = await firestore.collection("members").doc(memberId).get();
    let member = {
        Name: memberSnapshot.data().Name,
        email: memberSnapshot.data().email,
        phoneNumber: memberSnapshot.data().phoneNumber,
        address: memberSnapshot.data().address
    };
    return member;
}


exports.addMember = async (member) => {
    try {
        let newMemberRef = await firestore.collection("members").add(member);
        console.log("Member added with ID: ", newMemberRef.id);
    } catch (error) {
        console.log("Error adding member: ", error);
    }
}

exports.updateMember = async (memberId, updatedMember) => {
    try {
        let memberRef = firestore.collection("members").doc(memberId);
        await memberRef.update(updatedMember);
        console.log("Member with ID ${memberId} updated successfully");
    } catch (error) {
        console.log("Error updating member with ID ${memberId}: ", error);
    }
}

exports.deleteMember = async (memberId) => {
    try {
        await firestore.collection("members").doc(memberId).delete();
        console.log("Member deleted successfully");
    } catch (error) {
        console.log("Error deleting member: ", error);
    }
}
