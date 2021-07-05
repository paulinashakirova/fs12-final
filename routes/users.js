var express = require('express');
var router = express.Router();
var models = require('../models');

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
        'profile_photo'
      ]
      // include: { model: models.Album, attributes: ['name'] }
    });
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

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
router.post('/', async (req, res) => {
  const { name, email, password, address, phone, trusted_contact, trusted_name, profile_photo } = req.body;
  try {
    const user = await models.User.create({
      name,
      email,
      password,
      address,
      phone,
      trusted_contact,
      trusted_name,
      profile_photo
    });
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});
//shows an empty object although i know that i can post new contacts in users

//seems to work but i cannot see it anywhere

// router.post('/:id/contacts', async (req, res) => {
//   const { id } = req.params;
//   const { name, trustedPhone } = req.body;
//   try {
//     const user = await models.User.findOne({ where: { id } });
//     const contact = await user.createContact({ trustedPhone, name });
//     res.send(contact);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

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
//
//i also need to create an end point for deleting contact
///
module.exports = router;
