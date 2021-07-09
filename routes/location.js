var express = require('express');
var router = express.Router();
var models = require('../models');
const { v4: uuidv4 } = require('uuid');
const userShouldBeLoggedIn = require('../guards/userShouldBeLoggedIn');
const locationTokenShouldExist = require('../guards/locationTokenShouldExist');
const liveLocationShouldBeEnabled = require('../guards/liveLocationShouldBeEnabled');
require('dotenv').config();

//Get location by locationToken
router.get(
  '/liveLocation/:location_token',
  [locationTokenShouldExist, liveLocationShouldBeEnabled],
  async (req, res) => {
    const { location_token } = req.params;
    //guard locationTokenShouldExist

    try {
      const user = await models.User.findOne({
        where: { location_token }
      });
      const location = `${user.latitude}, ${user.longitude}`;
      console.log('this is the real location:', location);
      res.send(location);
      // console.log("this is the location of the user", user.latitude, user.longitude)
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

//here, we generate the location_token
//send email
//guar usershouldbe...
router.post('/liveLocation', userShouldBeLoggedIn, async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    await models.User.update({});
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Update location for one user from frontend

router.put('/liveLocation', userShouldBeLoggedIn, async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    await models.User.update({
      latitude,
      longitude
    });

    res.send({ message: 'Location successfully updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
