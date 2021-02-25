const express = require('express');
const router = express.Router();

// NOTE Interface
router.use('/interface', [
    require('./v1/interface/interface_ethernet_print'),
    require('./v1/interface/interface_print'),
    require('./v1/interface/interface_vlan'),
]);
// router.use('/interface', require('./v1/interface/interface_print'));
// router.use('/interface', require('./v1/interface/interface_vlan'));

// NOTE PPPoE
router.use('/ppp', [
    require('./v1/ppp/ppp_active_print'),
    require('./v1/ppp/ppp_secret_add'),
    require('./v1/ppp/ppp_secret_disable'),
    require('./v1/ppp/ppp_secret_enable'),
    require('./v1/ppp/ppp_interface_remove'),
    require('./v1/ppp/ppp_profile_print'),
    require('./v1/ppp/ppp_disabled_user_print'),
    require('./v1/ppp/ppp_secret_print'),
    require('./v1/ppp/ppp_selected_user_details_print'),
    require('./v1/ppp/ppp_enable_user_print'),
]);
// router.use('/ppp', require('./v1/ppp/ppp_active_print'));
// router.use('/ppp', require('./v1/ppp/ppp_secret_add'));
// router.use('/ppp', require('./v1/ppp/ppp_secret_disable'));
// router.use('/ppp', require('./v1/ppp/ppp_secret_enable'));
// router.use('/ppp', require('./v1/ppp/ppp_interface_remove'));
// router.use('/ppp', require('./v1/ppp/ppp_profile_print'));
// router.use('/ppp', require('./v1/ppp/ppp_disabled_user_print'));
// router.use('/ppp', require('./v1/ppp/ppp_secret_print'));
// router.use('/ppp', require('./v1/ppp/ppp_selected_user_details_print'));
// router.use('/ppp', require('./v1/ppp/ppp_enable_user_print'));


// NOTE IP
router.use('/ip', [
    require('./v1/ip/address'),
    require('./v1/ip/arp'),
]);


// NOTE System
router.use('/system', [
    require('./v1/system')
]);


module.exports = router;