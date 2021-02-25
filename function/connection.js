const RosApi = require("node-routeros");

const connect = ({
    host,
    user,
    password,
    port = 8728
}) => {
    let ret;
    try {
        ret = new RosApi.RouterOSAPI({
            host: host,
            port: port,
            user: user,
            password: password
        });
    } catch (err) {
        console.log("Error from RosApi connect", err)
        ret = {}
    }
    
    return ret
}

module.exports = connect
