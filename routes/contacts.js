var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await models.Contact.findOne({
      where: { id }
      // include: { model: models.Album, attributes: ['name'] }
    });
    res.send(contact);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  const { contact_id, name, trustedPhone } = req.body;
  try {
    const contact = await models.Contact.create({ contact_id, name, trustedPhone });
    res.send(contact);
  } catch (err) {
    res.status(500).send(err);
  }
});
