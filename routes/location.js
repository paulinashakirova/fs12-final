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
  '/livelocation/:locationToken',
  [userShouldBeLoggedIn, liveLocationShouldBeEnabled, locationTokenShouldExist],
  async (req, res) => {
    const { locationToken } = req.params;
    //guard locationTokenShouldExist

    try {
      const user = await models.User.findOne({
        where: { locationToken }
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

//Update location from frontend
router.put('/livelocation', [userShouldBeLoggedIn, liveLocationShouldBeEnabled], async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    await user.update({
      latitude,
      longitude
    });

    res.send({ message: 'Location successfully updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
