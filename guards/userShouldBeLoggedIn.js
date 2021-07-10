var jwt = require("jsonwebtoken");
var models = require("../models");
require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

// function userShouldBeLoggedIn(req, res, next) {
// 	let token = req.headers["x-access-token"];
// 	try {
// 		// Throws error on invalid/missing token
// 		let payload = jwt.verify(token, supersecret);
// 		// If we get here, a valid token was passed
// 		if (payload.userId === Number(req.params.userId)) {
// 			next();
// 		} else {
// 			res.status(401).send({ error: "Unauthorized" });
// 		}
// 	} catch (err) {
// 		res.status(401).send({ error: "Unauthorized" });
// 	}
// }
function userShouldBeLoggedIn(req, res, next) {
	const token = req.headers["x-access-token"];

	if (token) {
		console.log("this is the token", token);

		jwt.verify(token, supersecret, async (err, payload) => {
			console.log("this is the payload", payload);

			if (err) res.status(401).send({ message: "Please login first" });
			else {
				req.user = await models.User.findOne({
					where: { id: payload.user_id },
				});
				console.log("this is req.user", req.user);
				if (!req.user) {
					return res.status(404).send({ message: "This user does not exist" });
				}
				next();
			}
		});
	} else {
		res.status(401).send({ message: "Please login first" });
	}
}

module.exports = userShouldBeLoggedIn;
