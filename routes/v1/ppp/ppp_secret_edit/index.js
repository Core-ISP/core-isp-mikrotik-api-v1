const express = require('express'),
    router = express.Router();
const {
    with_params, without_params
} = require('./../../../../utils/mikrotik_cmd')

// Not Done
router.post('/secret_edit', (req, res) => {

    let host_params = {
        host: req?.body?.host_string?.host,
        user: req?.body?.host_string?.user,
        password: req?.body?.host_string?.password,
        port: req?.body?.host_string.port || 8728
    }
    const name = req.body.name
    const new_name = req.body.new_name

    try {
        const script = `/ppp/secret/print`;
        const find = `?name=${name}`;
        const peramitter = ["where", find]
        
        // Interface Removed
        // const script_interface = '/interface/pppoe-server/remove';
        // const remove_interface = `=numbers=<pppoe-${name}>`;
        // const peramitter_interface = [remove_interface]

        with_params({
            script,
            peramitter,
            host_params
        }).then(async retn => {
            console.log("log: ppp secret edit")
            retn = Array.isArray(retn) ? retn : [retn]

            // Remove Interface
            // try {
            //     await with_params({
            //         script: script_interface,
            //         peramitter: peramitter_interface,
            //         host_params
            //     })
            //     console.log("log: ppp interface remove")
            // } catch (error) {
            //     console.log("failed: Interface Not Removed")
            // }

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
                message: 'Internal Error',
                host: "." + String(host_params.host).split(".")[3],
                user: host_params.user,    
                mikrotik_json: [],  
            })
        })
    } catch (e) {
        console.log("Internal Error", e)
        res.json({
            success: false,
            message: 'Internal Error',
            host: "",
            user: host_params.user,
            mikrotik_json: [],
        })
    }
})

module.exports = router