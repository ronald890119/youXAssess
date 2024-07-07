const express = require('express');
const router = express.Router();

// application/json parser
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();

// get the university data controller
const uniController = require('../controllers/uniController');

// load university data
router.get('/load', uniController.load);

module.exports = router;