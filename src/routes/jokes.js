const express = require('express');
const router = express.Router();

router.get('/jokes', (req, res) => {
    res.render('jokes');
});

module.exports = router;
