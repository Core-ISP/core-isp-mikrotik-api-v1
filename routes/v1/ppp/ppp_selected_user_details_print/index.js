const express = require('express'),
    router = express.Router();
const {
    with_params
} = require('./../../../../utils/mikrotik_cmd')


// ANCHOR ppp_secret_print
router.post('/selected_user_details_print', (req, res) => {

    let host_params = {
        host: req.body.host_string.host,
        user: req.body.host_string.user,
        password: req.body.host_string.password,
        port: req.body.host_string.port || 8728
    }
    const name = req.body.name

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
            
            const script = '/ppp/secret/print';
            const peramitter = ['?name=' + name]        
            with_params({
                script,
                host_params,
                peramitter
            }).then(retn => {     
                console.log("log: return ppp selected user details print data")
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
            console.log("ppp_selected_user_details_print -> Catch Error ", e)
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