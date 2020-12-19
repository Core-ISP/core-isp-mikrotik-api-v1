const RosApi = require("node-routeros");

const connect = ({
    host, 
    user, 
    password, 
    port = 8728
}) => {
    return new RosApi.RouterOSAPI({
        host: host,
        port: port,
        user: user,
        password: password
    });
}

module.exports = connect
