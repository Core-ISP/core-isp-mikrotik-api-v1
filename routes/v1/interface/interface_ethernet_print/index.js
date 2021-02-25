const express = require('express'),
    router = express.Router();
const {
    without_params
} = require('../../../../utils/mikrotik_cmd')


// ANCHOR ethernet_speed_print
router.post('/ethernet_print', (req, res) => {

    let host_params = {
        host: req.body.host_string.host,
        user: req.body.host_string.user,
        password: req.body.host_string.password,
        port: req.body.host_string.port || 8728
    }

    if (
        typeof (host_params.host) === "undefined" ||
        typeof (host_params.user) === "undefined" ||
        typeof (host_params.password) === "undefined" ||
        typeof (host_params.port) === "undefined"
    ) {
        console.log("Input Invalid")
        res.json({
            success: false,
            msg: "invalid"
        })
    } else {
        try {
            
            const script = '/interface/ethernet/print';
            without_params({
                script,
                host_params
            }).then(retn => {     
                console.log("log: return interface ethernet print data")
                retn = Array.isArray(retn) ? retn : [retn]
                res.json({
                    success: true,
                    message: "interface_ethernet_speed_print -> done", 
                    host: "." + String(host_params.host).split(".")[3],
                    user: host_params.user,
                    mikrotik_json: retn,
                })
            }).catch(err => {
                console.log("interface_ethernet_speed_print -> Internal Error", err)
                res.json({
                    success: false,
                    message: "interface_ethernet_speed_print -> internal error",
                    host: "." + String(host_params.host).split(".")[3],
                    user: host_params.user,
                    mikrotik_json: [],
                })
            })
        } catch (e) {
            console.log("interface_ethernet_speed_print -> Catch Error ", e)
            res.json({
                success: false,
                message: "c_error",
                host: "",
                user: host_params.user,
                mikrotik_json: [],
            })
        }
    }
})

module.exports = router