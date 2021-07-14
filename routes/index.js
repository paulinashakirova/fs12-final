var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var locationRouter = require('./location');
var chatRouter = require('./chat');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/users', usersRouter);
router.use('/location', locationRouter);
router.use('/chat', chatRouter);

module.exports = router;
