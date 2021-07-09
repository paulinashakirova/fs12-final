const uuid = require('uuid');
// require('dotenv').config();

function locationTokenShouldExist(req, res, next) {
  const { location_token } = req.params; // comes in params

  if (location_token) {
    models.User.findOne({
      where: { location_token }
    });
  } else {
    res.status(401).send({ message: 'location token does not exist' });
  }
}

module.exports = locationTokenShouldExist;
