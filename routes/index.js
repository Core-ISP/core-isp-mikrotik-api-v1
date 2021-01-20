const express = require('express');
const router = express.Router();

// NOTE PPPoE
router.use('/ppp', require('./v1/ppp/ppp_active_print'));
router.use('/ppp', require('./v1/ppp/ppp_secret_add'));
router.use('/ppp', require('./v1/ppp/ppp_secret_disable'));
router.use('/ppp', require('./v1/ppp/ppp_secret_enable'));
router.use('/ppp', require('./v1/ppp/ppp_interface_remove'));
router.use('/ppp', require('./v1/ppp/interface_ethernet_speed_print'));
router.use('/ppp', require('./v1/ppp/ppp_profile_print'));
router.use('/ppp', require('./v1/ppp/ppp_disabled_user_print'));
router.use('/ppp', require('./v1/ppp/ppp_secret_print'));
router.use('/ppp', require('./v1/ppp/ppp_selected_user_details_print'));
router.use('/ppp', require('./v1/ppp/ppp_enable_user_print'));


// NOTE System
router.use('/system', require('./v1/system'));


module.exports = router;