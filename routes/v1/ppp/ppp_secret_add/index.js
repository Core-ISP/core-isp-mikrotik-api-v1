const express = require('express'), router = express.Router();
const {
    with_params
} = require('./../../../../utils/mikrotik_cmd')

router.post('/ppp_secret_add', (req, res) => {

    let host_string = {
        host: req.body.host_string.host,
        user: req.body.host_string.user,
        password: req.body.host_string.password,
        port: req.body.host_string.port || 8728
    }

    try {
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
            
            const name = req.body.name
            const password = req.body.pass;
            const profile = req.body.profile;

            const service = 'pppoe';
            const scpt = '/ppp/secret/add';
            const one = `=name=${name}`
            const two = `=password=${password}`
            const three = `=profile=${profile}`
            const four = `=service=${service}`;

            const peramitter = [one, two, three, four]

            with_params({
                host_params: host_string,
                script: scpt,
                peramitter
            }).then(retn => {
                console.log("log: create ppp adding data")
                res.json({
                    host: "." + String(host_string.host).split(".")[3],
                    user: host_string.user,
                    mikrotik_json: retn,
                    msg: "done"
                })
            }).catch(err => {
                console.log("Internal Error")
                res.json({
                    success: false,
                    msg: 'error'
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