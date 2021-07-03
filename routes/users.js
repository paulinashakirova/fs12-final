var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const users = await models.User.findAll({
      attributes: ['id', 'name', 'email', 'password', 'address', 'phone']
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
  const { name, email, password, address, phone } = req.body;
  try {
    const user = await models.User.create({ name, email, password, address, phone });
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post('/:id/contacts', async (req, res) => {
  const { id } = req.params;
  const { name, trustedPhone } = req.body;
  try {
    const user = await models.User.findOne({ where: { id } });
    const contact = await user.createContact({ trustedPhone, name });
    res.send(contact);
  } catch (err) {
    res.status(500).send(err);
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
