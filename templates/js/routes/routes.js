var express = require('express');
var router = express.Router();

var index = require('../app/controllers/index_controller');

router.get('/', index.home);

module.exports = router;