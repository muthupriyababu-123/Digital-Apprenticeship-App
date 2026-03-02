const express = require('express');
const router = express.Router();
const { submitTask } = require('../controllers/submissionController');

router.post('/submit', submitTask);

module.exports = router;