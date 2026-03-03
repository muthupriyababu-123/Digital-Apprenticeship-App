const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Submissions endpoint' });
});

module.exports = router;
