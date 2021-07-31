const express = require('express'), router = express.Router();
const { with_params } = require('./../../../../utils/mikrotik_cmd')


router.post('/secret_find_user', (req, res) => {

    let host_params = {
        host: req?.body?.host_string?.host,
        user: req?.body?.host_string?.user,
        password: req?.body?.host_string?.password,
        port: req?.body?.host_string.port || 8728
    }
    const name = req.body.name
    
    try {
        const script = `/ppp/secret/print`;
        const find = `?name=${name}`;
        const peramitter = ["where", find]
        
        with_params({
            script,
            peramitter,
            host_params
        }).then(async retn => {

            console.log("log: ppp secret user find")
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