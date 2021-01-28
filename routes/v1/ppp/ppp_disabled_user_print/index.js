const express = require('express'),
    router = express.Router();
const {
    with_params
} = require('./../../../../utils/mikrotik_cmd')


// ANCHOR ppp_disabled_user_print
router.post('/disabled_user_print', (req, res) => {

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
            let script = '/ppp/secret/print';
            const peramitter = ['?disabled=yes']

            with_params({
                script,
                host_params,
                peramitter
            }).then(retn => {     
                console.log("log: return ppp disabled user print data")
                res.json({
                    host: "." + String(host_params.host).split(".")[3],
                    user: host_params.user,
                    mikrotik_json: retn,
                    msg: "done" 
                })
            }).catch(err => {
                console.log("Internal Error", err)
                res.json({
                    success: false,
                    host: "." + String(host_params.host).split(".")[3],
                    user: host_params.user,
                    msg: "internal error"
                })
            })
        } catch (e) {  
            console.log("ppp_disabled_user_print -> Catch Error ", e)
            res.json({
                success: false,
                msg: "catch error"
            })
        }
    }
})

module.exports = router