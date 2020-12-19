const express = require('express');
const router = express.Router();


router.use('/ppp', require('./ppp/ppp_active_print'));




module.exports = router;