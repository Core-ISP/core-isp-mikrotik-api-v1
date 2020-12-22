const express = require('express'), 
router = express.Router();
const {
    with_params
} = require('./../../../../utils/mikrotik_cmd')


router.post('/ppp_secret_add', (req, res) => {

    let host_params = {
        host: req.body.host_string.host,
        user: req.body.host_string.user,
        password: req.body.host_string.password,
        port: req.body.host_string.port || 8728
    }

    const name = req.body.name
    const password = req.body.pass;
    const profile = req.body.profile;

    try {
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
            const service = 'pppoe';
            const script = '/ppp/secret/add';
            const one = `=name=${name}`
            const two = `=password=${password}`
            const three = `=profile=${profile}`
            const four = `=service=${service}`;

            const peramitter = [one, two, three, four]

            with_params({
                host_params,
                script,
                peramitter
            }).then(retn => {
                console.log("log: create ppp adding data")
                res.json({
                    host: "." + String(host_params.host).split(".")[3],
                    user: host_params.user,
                    mikrotik_json: retn,
                    msg: "done"
                })
            }).catch(err => {
                console.log("Internal Error")
                res.json({
                    host: "." + String(host_params.host).split(".")[3],
                    user: host_params.user,
                    success: false,
                    msg: 'internal error'
                })
            })
        }
    } catch (e) {
        console.log("ppp_secret_add -> Catch Error ", e)
        res.json({
            success: false,
            msg: "c_error"
        })
    }
})


module.exports = router