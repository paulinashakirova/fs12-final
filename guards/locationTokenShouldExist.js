
var models = require("../models");

async function locationTokenShouldExist(req, res, next) {
	const { location_token } = req.params;

	if (location_token) {
		req.user = await models.User.findOne({
			where: { location_token },
		});

		if (!req.user)
			res.status(404).send({ message: "location token does not exist" });
		next();
	} else {
		res.status(404).send({ message: "location token does not exist" });
	}
}

module.exports = locationTokenShouldExist;
