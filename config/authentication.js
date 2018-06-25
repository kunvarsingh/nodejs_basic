var jwt = require('jwt-simple');
var cfg = require('./passport_config.js');

exports.authenticationMiddleware = function () {
    return function (req, res, next) {
        if (req.headers && req.headers.authorization) {
            // var token = req.headers.authorization;
            // var decoded = jwt.decode(token, cfg.secret);
            // console.log(decoded,"decoded");

            var parted = req.headers.authorization.split(' ');
            if (parted.length === 2) {
                console.log("Hi am authenticated--", parted[1]);
                return next();
            } else {
                res.status(401).send("Not a valid token.")
            }
        } else {
            res.status(400).send("Oops ! Something went wrong.")
        }
    };
};