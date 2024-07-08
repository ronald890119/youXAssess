const express = require('express');
const router = express.Router();

// application/json parser
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();

// get the university data controller
const uniController = require('../controllers/uniController');

// load university data
router.get('/load', uniController.load);

// add first university to the end
router.post('/add', uniController.add);

// get university by index
router.get('/retrieve/:index', uniController.getByIndex);

// update information of university
router.put('/update', uniController.update);

// delete last item
router.delete('/delete', uniController.delete);

module.exports = router;