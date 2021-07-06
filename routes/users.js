var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Router } = require('express');
const saltRounds = 10;

require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await models.User.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'password',
        'address',
        'phone',
        'trusted_contact',
        'trusted_name',
        'profile_photo',
        'latitude',
        'longitude'
      ]
      // include: { model: models.Album, attributes: ['name'] }
    });
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET one user
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: { id }
    });
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get location by user id
router.get('/:id/location', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await models.User.findOne({
      where: { id }
    });
    res.send(user.latitude);   
    console.log("this is the location of the user", user.latitude, user.longitude)
  } catch (err) {
    res.status(500).send(err);
  }
})

// REGISTRATION OF USER
router.post('/register', async (req, res) => {
  
  const { name, email, password, address, phone, trusted_contact, trusted_name, profile_photo, latitude, longitude } = req.body;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds)
    // console.log("this is the hash" , hash)
       
    const user = await models.User.create({
      name,
      email,
      password: hash,
      address,
      phone,
      trusted_contact,
      trusted_name,
      profile_photo,
      latitude,
      longitude
    });
    // console.log("this is the user",user)
    res.send(user);
  } catch (err) {
    res.status(500).send({ msg: 'Please, fill in all required fields.' });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const results = await models.User.findOne({
      where: { email }       
  });
  console.log("this are the results", results)
  const user = results.id;
  console.log("this is the user", user)
  
  if (user) {
    const user_id = results.id;
    console.log("this is the user_id", user_id)

    const correctPassword = await bcrypt.compare(password, results.password)
    console.log("this is the correcPassword", correctPassword )


    if (!correctPassword) throw new Error("Incorrect Password");

    const token = jwt.sign({ user_id }, supersecret)
    res.send({ message: "Login succesful, here is your token", token })
  } else {
    throw new Error ("User does not exist");
  }

} catch (error) {
  res.status(400).send({ message: err.message })
}
});



router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await models.User.destroy({
      where: { id }
    });
    res.send({ msg: 'User deleted' });
  } catch (err) {
    res.status(404).send(err);
  }
});

module.exports = router;
