const firestore = require('../../src/config/firebase-config');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const jsonConfig = require('../../ressources/json/config.json');

const JWT_SECRET = process.env.JWT_SECRET || jsonConfig.jwtSecret;

const jwtMiddleware = require('./jwt-middleware');

exports.register = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Service to register new member into libraryapi'
    // #swagger.summary = 'Service to register new member'
    const {
        email,
        password,
        Name,
        phoneNumber,
        address
    } = req.body;

    let userHasAlreadyAccount = await hasAlreadyAccount(email);

    if (userHasAlreadyAccount == true) {
        return res.status(403).json({
            "error": "User has already account"
        });
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
        firestore.collection("members").add({
            "email": email,
            "password": hash,
            "Name": Name,
            "phoneNumber": phoneNumber,
            "address": address
        }).then(function (docRef) {
            let messageToReturn = "User added successfully !";

            firestore.collection("members").doc(docRef.id).update({
                "uid": docRef.id
            });

            console.log(messageToReturn);

            let jwtToken = createJwtToken(docRef.id, email, Name);

            return res.status(201).send({
                "uid": docRef.id,
                "accessToken": jwtToken,
            });
        }).catch(function (error) {
            return res.status(500).send({
                "error": "Something went wrong :("
            });
        });
    });
}

exports.signIn = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Service to sign in into API and get jwt token for stateless authentication'
    // #swagger.summary = 'Service to sign-in'
    const {
        email,
        password
    } = req.body;

    let userSnapshot = await firestore.collection("members").where("email", "==", email);
    let userData = (await userSnapshot.get()).docs[0];

    if (!userData) {
        return res.status(403).json({
            "error": "Invalid email or password"
        });
    }

    userData = userData.data();

    console.log(userData);
    bcrypt.compare(password, userData.password, function (err, result) {
        if (result == false) {
            return res.status(403).json({
                "error": "Invalid email or password"
            });
        } else {
            let jwtToken = createJwtToken(userData.uid, userData.email, userData.Name);

            return res.status(200).send({
                uid: userData.uid,
                accessToken: jwtToken,
            });
        }
    });
}

exports.getCurrentUser = async (req, res) => {
    // #swagger.tags = ['Auth']
    // #swagger.description = 'Service to get authenticated member info'
    // #swagger.summary = 'Service to get authenticated member'
    /* #swagger.security = [{
                "bearerAuth": []
    }] */


    // -- Get token from header
    const token = req.headers.authorization && jwtMiddleware.extractBearerToken(req.headers.authorization);

    // -- Decode jwt token
    const decoded = jwt.decode(token, {
        complete: false
    });

    let userSnapshot = await firestore.collection("members").where("email", "==", decoded.username);
    let userData = (await userSnapshot.get()).docs[0];
    userData = userData.data();
    userData.password = "";

    return res.json(userData);
}

const hasAlreadyAccount = async (email) => {
    let userSnapshot = await firestore.collection("members").where("email", "==", email);
    let userData = (await userSnapshot.get()).docs[0];
    if (userData) {
        return true;
    } else {
        return false;
    }
}

const createJwtToken = (uid, email, Name) => {
    const token = jwt.sign({
        uid: uid,
        username: email,
        Name: Name
    }, JWT_SECRET, {
        expiresIn: '2 hours'
    });

    return 'Bearer ' + token;
}