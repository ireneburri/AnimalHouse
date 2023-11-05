const express = require('express');
const User = require('../models/mUser');
const Staff = require('../models/mStaff');
const fs = require('fs');
const path = require('path');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

let router = express.Router();
const ENCRIPTION_KEY = process.env.CRYPT_KEY

const publicKey = process.env.publicKey
const privateKey = process.env.privateKey

const authLevelDict = {
    "staff": 3,
    "user": 2,
    "unregistered": 1,
}


function verifyAuth(requiredAuth) {
    console.log(("Im auth"));
    return async function(req, res, next) {
        let auth = req.tokenDecoded.auth;
        if (auth >= requiredAuth) {
            console.log("Auth level OK");
            next();
        } else {
            return res.status(401).json({ message: "Auth level not sufficient" });
        }
    }
}

async function verifyLogin(req, res, next) {
    console.log("Im in");
    if ('authority' in req.headers && req.headers['authority'] !== null && req.headers['authority']) {
        let authHeader, token
        try {
            console.log(req.headers);
            authHeader = req.headers['authority'];
            token = authHeader;
        } catch (err) {
            return res.status(400).json({ message: "Error in retriving token from header", error: err });
        }
        console.log(token);
        if (token) {
            console.log(publicKey);
            console.log(privateKey);
            jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, decoded) => {
                if (!err) {
                    req.tokenDecoded = decoded;
                    console.log(decoded);
                    console.log("LogIn OK");
                    next();
                } else return res.status(401).json({ message: "Error in verifying token", error: err });
            })
        } else return res.status(401).json({ message: "Missing token" });
    } else
        return res.status(401).json({ message: "Required auth token" })
}

async function checkUser(user, data, res, authLevel) {
    let decryptedPwd = CryptoJS.AES.decrypt(user.password, ENCRIPTION_KEY).toString(CryptoJS.enc.Utf8)

    if (!user || user === null) {
        console.log("no user");
        return res.status(404).json({ message: "User not found" });
    } else if (decryptedPwd != data.password) {
        console.log("password incorrect");
        return res.status(403).json({ message: "Your password is incorrect" });
    }

    const token = await generateToken(authLevel, user._id, user.username);
    console.log(token);
    return res.status(200).json({ "authority": token });
}

async function generateToken(authLvl, id, username) {
    const unsignedToken = {
        auth: authLvl,
        username: username,
        id: id
    }
    console.log(unsignedToken);
    const token =
        jwt.sign(
            unsignedToken,
            privateKey, { algorithm: "HS256", expiresIn: "31d" }
        );
    console.log(token);
    return token;
}

router.post('/login/user', async(req, res) => {
    let data = req.body;
    let query = { username: data.username }
    const user = await User.findOne(query)
    console.log(user);
    try {
        await checkUser(user, data, res, authLevelDict['user'])
    } catch (err) {
        res.status(500).json({ message: "No User found", error: err });
        console.log("no user found");
    }
})

router.post('/login/staff', async(req, res) => {
    let data = req.body;
    let query = { username: data.username }
    const staff = await Staff.findOne(query)

    try {
        await checkUser(staff, data, res, authLevelDict['staff'])
    } catch (err) {
        res.status(500).json({ message: "No User found", error: err });
    }
});

router.get('/publicKey', (req, res) => {
    return res.status(200).json({ publicKey: publicKey.toString() })
})

module.exports = router
module.exports.verifyAuth = verifyAuth
module.exports.verifyLogin = verifyLogin
module.exports.checkUser = checkUser
module.exports.generateToken = generateToken
module.exports.authLevelDict = authLevelDict