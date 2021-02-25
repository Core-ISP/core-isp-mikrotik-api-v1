const express = require('express'),
    router = express.Router();
const {
    without_params
} = require('./../../../utils/mikrotik_cmd')


router.get('/resource/ok', (req, res) => {
    res.send("Running OK")
})


// ANCHOR system_resource_print
router.post('/resource/print', (req, res) => {
    
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
            const script = '/system/resource/print';
            
            without_params({
                script,
                host_params
            }).then(retn => {     
                console.log("log: return -> system resource print -> data")
                retn = Array.isArray(retn) ? retn : [retn]
                res.json({
                    success: true,
                    message: "done",
                    host: "." + String(host_params.host).split(".")[3],
                    user: host_params.user,
                    mikrotik_json: retn,
                })
            }).catch(err => {
                console.log("Internal Error", err)
                res.json({
                    success: false,
                    message: "internal error",
                    host: "." + String(host_params.host).split(".")[3],
                    user: host_params.user,
                    mikrotik_json: [],
                })
            })
        } catch (e) {  
            console.log("ppp_secret_print -> Catch Error ", e)
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
