const express = require('express'),
    router = express.Router();
const {
    with_params
} = require('./../../../../utils/mikrotik_cmd')


router.post('/secret_enable', (req, res) => {

    let host_params = {
        host: req.body.host_string.host,
        user: req.body.host_string.user,
        password: req.body.host_string.password,
        port: req.body.host_string.port || 8728
    }
    const name = req.body.name

    try {
        const script = '/ppp/secret/enable';
        const enable = `=numbers=${name}`;
        const peramitter = [enable]

        with_params({
            script,
            peramitter,
            host_params
        }).then(retn => {
            console.log("log: ppp secret enable")
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

module.exports = router