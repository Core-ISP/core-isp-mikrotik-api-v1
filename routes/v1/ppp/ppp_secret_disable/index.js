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

    try {
        const script = '/ppp/secret/disable';
        const remove = `=numbers=${name}`;
        const peramitter = [remove]

        with_params({
            script,
            peramitter,
            host_params
        }).then(retn => {
            console.log("log: ppp secret disable")
            res.json({
                success: true,
                host: "." + String(host_params.host).split(".")[3],
                user: host_params.user,    
                mikrotik_json: retn
            })
        }).catch(err => {
            console.log("Internal Error", err)
            res.json({
                success: false,
                host: "." + String(host_params.host).split(".")[3],
                user: host_params.user,    
                message: 'Internal Error'
            })
        })
    } catch (e) {
        console.log("Internal Error", e)
        res.json({
            success: false,
            message: 'Internal Error'
        })
    }
})

module.export = router