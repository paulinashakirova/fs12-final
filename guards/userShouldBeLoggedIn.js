var jwt = require("jsonwebtoken");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
    const token = req.headers["x-access-token"]

    if (token) {
        jwt.verify(token, supersecret, async (err, payload) => {
          if (err) res.status(401).send({ message: "Please login first" });
          else {
              req.user_id = payload.user_id
              next()
          }
        });
    } else {
        res.status(401).send({ message: "Please login first" });
    }
}

module.exports = userShouldBeLoggedIn;