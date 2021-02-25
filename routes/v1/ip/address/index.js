const express = require('express'),
    router = express.Router();
const {
    without_params
} = require('../../../../utils/mikrotik_cmd')


// ANCHOR interface print
router.post('/address_print', (req, res) => {

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
            const script = '/ip/address/print';
            without_params({
                script,
                host_params
            }).then(retn => {     
                console.log("log: return address print data")
                retn = Array.isArray(retn) ? retn : [retn]
                res.json({
                    success: true,
                    message: "address_print -> done", 
                    host: "." + String(host_params.host).split(".")[3],
                    user: host_params.user,
                    mikrotik_json: retn,
                })
            }).catch(err => {
                console.log("address_print -> Internal Error", err)
                res.json({
                    success: false,
                    message: "address_print -> internal error",
                    host: "." + String(host_params.host).split(".")[3],
                    user: host_params.user,
                    mikrotik_json: [],
                })
            })
        } catch (e) {
            console.log("address_print -> Catch Error ", e)
            res.json({
                success: false,
                message: "address_print -> c_error",
                host: "",
                user: host_params.user,
                mikrotik_json: [],
            })
        }
    }
})

module.exports = router