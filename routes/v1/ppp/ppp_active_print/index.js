const express = require('express'),
    router = express.Router();
const {
    without_params
} = require('./../../../../utils/mikrotik_cmd')


// ANCHOR ppp_active_print
router.post('/ppp_active_print', (req, res) => {

    let host_string = {
        host: req.body.host_string.host,
        user: req.body.host_string.user,
        password: req.body.host_string.password,
        port: req.body.host_string.port || 8728
    }

    if (
        typeof (host_string.host) === "undefined" ||
        typeof (host_string.user) === "undefined" ||
        typeof (host_string.password) === "undefined" ||
        typeof (host_string.port) === "undefined"
    ) {

        console.log("Input Invalid")
        res.json({
            success: false,
            msg: "invalid"
        })

    } else {
        try {
            const scpt = '/ppp/active/print';
            without_params({
                script: scpt,
                host_params: host_string
            }).then(retn => {
                console.log("log: return ppp active print data")
                res.json({
                    host: "." + String(host_string.host).split(".")[3],
                    user: host_string.user,
                    mikrotik_json: retn,
                    msg: "done" 
                })
            }).catch(err => {
                console.log("Internal Error", err)
                res.json({
                    success: false,
                    user: host_string.user,
                    msg: "error"
                })
            })
        } catch (e) {
            console.log("ppp_active_print -> Catch Error ", e)
            res.json({
                success: false,
                msg: "c_error"
            })
        }
    }
})

module.exports = router