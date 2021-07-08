const uuid = require('uuid');
// require('dotenv').config();

function locationTokenShouldExist(req, res, next) {
  const locationToken = req.headers['y-location-token'];

  if (locationToken) {
    uuid.validate(locationToken, async (err) => {
      if (err) res.status(401).send({ message: 'location token does not exist' });
      else {
        req.locationToken = locationToken;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'location token does not exist' });
  }
}

module.exports = locationTokenShouldExist;
