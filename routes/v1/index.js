const express = require('express');
const router = express.Router();


router.use('/ppp', require('./ppp/ppp_active_print'));
router.use('/ppp', require('./ppp/ppp_secret_add'));
router.use('/ppp', require('./ppp/ppp_secret_disable'));




module.exports = router;