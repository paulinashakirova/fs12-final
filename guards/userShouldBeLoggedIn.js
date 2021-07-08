var jwt = require('jsonwebtoken');
var models = require('../models');
require('dotenv').config();
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers['x-access-token'];

  if (token) {
    console.log('this is the token', token);

    jwt.verify(token, supersecret, async (err, payload) => {
      if (err) res.status(401).send({ message: 'Please login first' });
      else {
        req.user_id = await models.User.findOne({
          where: { id: payload.user_id }
        });
        console.log('this is req.user', req.user);
        if (!req.user) {
          return res.status(404).send({ message: 'This user does not exist' });
        }
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'Please login first' });
  }
}

module.exports = userShouldBeLoggedIn;
