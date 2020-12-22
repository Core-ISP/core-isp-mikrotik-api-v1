const express = require('express');
const router = express.Router();

// NOTE PPPoE
router.use('/ppp', require('./ppp/ppp_active_print'));
router.use('/ppp', require('./ppp/ppp_secret_add'));
router.use('/ppp', require('./ppp/ppp_secret_disable'));
router.use('/ppp', require('./ppp/ppp_secret_enable'));
router.use('/ppp', require('./ppp/ppp_interface_remove'));
router.use('/ppp', require('./ppp/interface_ethernet_speed_print'));
router.use('/ppp', require('./ppp/ppp_profile_print'));
router.use('/ppp', require('./ppp/ppp_disabled_user_print'));
router.use('/ppp', require('./ppp/ppp_secret_print'));
router.use('/ppp', require('./ppp/ppp_selected_user_details_print'));


module.exports = router;