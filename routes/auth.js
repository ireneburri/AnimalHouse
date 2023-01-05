const express = require('express');
const User = require('../models/mUser');
const Staff = require('../models/mStaff');
const fs = require('fs');
const path = require('path');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

let router = express.Router();
//const keysPath = path.join(global.rootDir, '.keys');
const ENCRIPTION_KEY = process.env.CRYPT_KEY

//const PRIVATE_KEY = process.env.PRIV_KEY
//const PUBLIC_KEY = process.env.PUB_KEY

const publicKey = process.env.publicKey
const privateKey =process.env.privateKey

/*const publicKey = [
    '-----BEGIN PUBLIC KEY-----',
    'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAn0ndXQ0mI5p84idjqGOL',
    'aYmrDVTslx9E7JuOswWSDEK3lW0D63AHgSy839a/6iY5pKlCxjeYhMQdOtHyGflU',
    'UMI/BQK6lw6rHF6Z+EyjZ+fqVDlspalDRtmRa4josyBkA6T6VXL/eTzLeJty3SBA',
    'AYtvcrSDzCwpcR1Ds3rlxcP/a4XmFSapV2zN8CU9FUGJkI0Kur+O2/hSUeZJxpDq',
    'PBlYQNbkZ4aYawjJgrUa34uZLC8SwVdi93+vLQI8J7ta3hgqa+9SCVxscnLHjKXi',
    '6HqGWZgHoh+17eJaehTEMScG9QNlZSK5YqMEXcTaOtkwNKJ95l5mFdwKFH4+jI+W',
    'sSedKNaxB53W/oIM75/edAHEbznDNSu6Djhkf00VRT6Dy6gmoTBDekXxcl+z8cos',
    'sOPz9FLWY38oKgqOtgbtSZH0megNfAQf6E+yDFWDLKsPfFK64B0hNb/vx2w0p79y',
    '4kLavzcz2XC1VDyn3UmILOYhFfjperV3pyI743xQw3qqGkUSjseQhaEsxp/wSgpn',
    'KlxpDs0YgMzmg0Dxp+yvoDpt5X6X6aOfzpRg2OG2gqQfamMd/HYCCfuFuo8C2TnF',
    'g5xVuBDu7ngxm74xD1pB1m1pTpLnywaZaQ6b5BY/V1FdUIgMUkGyYYEThLJf0DLO',
    'b/6Zbu4DR/BJ2Fzkdq5NICECAwEAAQ==',
    '-----END PUBLIC KEY-----',
].join('\n');

const privateKey = ['-----BEGIN RSA PRIVATE KEY-----',
    'MIIJKQIBAAKCAgEAn0ndXQ0mI5p84idjqGOLaYmrDVTslx9E7JuOswWSDEK3lW0D',
    '63AHgSy839a/6iY5pKlCxjeYhMQdOtHyGflUUMI/BQK6lw6rHF6Z+EyjZ+fqVDls',
    'palDRtmRa4josyBkA6T6VXL/eTzLeJty3SBAAYtvcrSDzCwpcR1Ds3rlxcP/a4Xm',
    'FSapV2zN8CU9FUGJkI0Kur+O2/hSUeZJxpDqPBlYQNbkZ4aYawjJgrUa34uZLC8S',
    'wVdi93+vLQI8J7ta3hgqa+9SCVxscnLHjKXi6HqGWZgHoh+17eJaehTEMScG9QNl',
    'ZSK5YqMEXcTaOtkwNKJ95l5mFdwKFH4+jI+WsSedKNaxB53W/oIM75/edAHEbznD',
    'NSu6Djhkf00VRT6Dy6gmoTBDekXxcl+z8cossOPz9FLWY38oKgqOtgbtSZH0megN',
    'fAQf6E+yDFWDLKsPfFK64B0hNb/vx2w0p79y4kLavzcz2XC1VDyn3UmILOYhFfjp',
    'erV3pyI743xQw3qqGkUSjseQhaEsxp/wSgpnKlxpDs0YgMzmg0Dxp+yvoDpt5X6X',
    '6aOfzpRg2OG2gqQfamMd/HYCCfuFuo8C2TnFg5xVuBDu7ngxm74xD1pB1m1pTpLn',
    'ywaZaQ6b5BY/V1FdUIgMUkGyYYEThLJf0DLOb/6Zbu4DR/BJ2Fzkdq5NICECAwEA',
    'AQKCAgAYbnfpgc7LvzJQbcI3Xa1QbrExxkjTlRQ5RlLI2p3gC4uk+6eSQQilo3sE',
    'yid9fodw3hVD2dsm4f2pu/HqUffAu0p3NkfwS2urWkc7cmXN1iB28qfbcO7EuzI2',
    '0DUA5ILynCdZW94bdluvEAi6KewnUH+zlERy2IMyuk5cBQmhH8LZdxwnOlrW8fVU',
    'VCHeVMMIzNlMc30x+BCIR04hirCirzB+IXe++UH/iMV/qs+IYh0ITeAOj5y6YXc4',
    '7BLV9UKmtgYrr/VhQi/QDhLVW8xF5CUfMNZa44pABmviNbUx5M6IXhD7RiwxGNfe',
    'mgbu58khCZtN7kSyLaHOKt7lKFDwdSOcCyqTnWkmGuf01CinH9653L59ze1qeyng',
    'qUtg5fJADEEz3zAhp5k1wFNvjs0/fHaAND1L234fhduVb0uiX5TsBcGZ4FDsHNT/',
    'tLRANnUG5PzTu0Mv0Gm31WZEcIXIpBzPPC1LbppLxB04uuIbXRNa0qP8m6rdIKtg',
    'IgqaktPNeDggAQTlN94HY1u0pFGJoPAP7bBFOZhD4XSOznb02gY4T3nVR5gZl500',
    'yElrTDT451n8ga1NwvY2Vg9+PRJnBE1b6z0GWLG/9gLbHHDNz5z9/DArkDy4LUCF',
    'BAZGV3V3MbtwPUqRvSm1dxEMmuQzIE7HkMET/EFIlIM2JADCwQKCAQEA041ji+yS',
    'vAKwbrqVTo43AyK5c2VY+WS/W2QokFeOhE3Vs+oEGyMFOo6NQqD7fskxvTIFvb1B',
    'bohw56HDise7P93DKQ1RfpuEfQ30YfF78mv4XMJh6BF9cFyXx2JibJQ8PkpIUtdk',
    'GS2/XRNl7V9w8pHw9IF+V0WvqKxNKH5iKFeId3HuJOoYDN43kdS+su2SNOEXgTub',
    'cVwxiUWsXSLREwIU3VmIP8YAWu0+UO/XKwC5UNguXgQP/ga0xTnPxnYWxsbTSfxt',
    'u6nEDqWeXXz0SxUNkaWkmoq6im9L9QexmObgxHhetJBEy5r2S16OLylO5ilGCGRj',
    'xHPD5WXJ/gmNbQKCAQEAwMFm/cnjARWDqGhC/IUGexHtTsMN5g1gku64P4qe9Tch',
    '5fFuHEHzeOz/JzsaGIjtOsZ/x5ZuWH5vylI5akrMRxrsemaOGhMZaa+xbTQMVeUV',
    '4740c27+ABO9eEAkWTsd+QQakou8czG/FpCS3L/AJh6UncBTk+TuudQGCwRH619/',
    '354tSgAEU/GsDYT645fM3DS3RvfRPdutDSE6ip2IiGzgRlIfv831WZJBslZRRsoC',
    'WwlMN7rBpjGrhjLfXRYR5aTkWryszXBLNnN5J6iboRYShaKGk8eQ0mSQresVH1tF',
    'ghw0HlQnt7nj2g3l7M47xcXV/IZscJD9miLSZomxBQKCAQEAwXw7Y6qHufUrsNpt',
    '3F8t6WxE+UnkSpTef5Pnlby+2DroDZknEDrDeX8Pq7TY0GjrWQL7RUJnKdUYjoHg',
    '+nkaxZrp+A36TzWlw0qUDVBz8JDXot8V9M6qT64gE3fkVTJutvnxk/Lz1iOFNneb',
    'bbMw9mqMWtRk3SUbN8X++947oHIOmlBVYuXIAVzsrjBKChRG+J42hTgjP1b253oV',
    '30kMt7nbo2dTuiA6Cu+ZYyU5QldzJoHSRqKojclMZGYvpnAy/LK0ZKK/Kjhm3I6V',
    'fSPfuxwSQPeiyMXBPwP0ELNst0/Sm18MH1Ej2qRsRxrAKFo7kz6EkwBeTzsiHBkw',
    '2WubMQKCAQAjKuYUhaICD5/OuP8HvWl6SMIILbQ6ddRZ2m4JQcxQpvdrUYoqY6n9',
    'NRg0WycetNS7dX3Yt0x4ntDck/Xfu7fbfUEJ7+4bOcLYMnLnnqhlf39n5ssBCI4V',
    'C4T1DJbVJOEKDsKeXBpM1hWsE0KIPf/btJae1XkqMYmQo+taVTSd7/WPofdXWftw',
    'KVafvNRdc9OvlXqe2xX0+EBxdc+NfMJtSZf9nHwobXZHGlUcKX14seCOJXsfa9Zq',
    '8QL/YAa6oA0x3cy/9U59yPAgBh9jqfKDCFjmwslU6wM0L57p7EsVRny/CVBE/Eum',
    'zKaSoRiDBPmI0tiA0zGzs/BhD9tdU9/VAoIBAQCCvsk7lXBEB/MS8xYYulijG1jy',
    'rW0IiIQvmJX50lDicFCdjedrzf2Sl/ETYWnYR6/jIzIjnmX4xC6vW0VJMlFk6BPZ',
    'LhMs7wKuzICcUzps/NqQsnCFshcDwKDhtBaBKRr5V7rvxJOk6C3SmjqJnx4rAC5M',
    '8L8U7shUhxIp2150gWML8eE/ZHPDwEkIwSD3Y3RD/4XpufrmNoexPoh4zpmX/y6b',
    '+Ssf90iytbUGCgdQaTMWixFEzwnxnUJ0jBoUf9SXDYdYcQfRzQ7v3mjmWxyXoXZu',
    'fHMfuQ+ZyaF0QjhaIYm6vEL8G7CmnnkNPCtIdlpsqHKQic75zgqgx0lCJOc+',
    '-----END RSA PRIVATE KEY-----',
].join('\n');*/

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