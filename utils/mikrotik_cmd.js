const connection = require('../function/connection');

/**
    connString: {
        host: '27.147.202.78',
        port: 8728,
        user: 'arnob',
        password: 'arnob@20'
    }
 */


const with_params = ({
    script,
    peramitter = [],
    host_params =
    {
        host: "",
        user: "",
        password: "",
        port: 8728
    }
}) => {
    return new Promise((resolve, reject) => {
        try {

            const conn = connection({
                host: host_params.host,
                user: host_params.user,
                password: host_params.password,
                port: host_params.port,
            })

            conn.connect()
                .then(() => {
                    conn.write(
                        script,
                        peramitter
                    ).then((data) => {
                        conn.close();
                        resolve(data)
                    }).catch((err) => {
                        conn.close();
                        console.log("with_params -> Server Error")
                        resolve({})
                    });
                })
                .catch(err => {
                    conn.close();
                    console.log("with_params -> Server Error")
                    resolve({})
                })
        } catch (e) {
            console.log("with_params -> catch -> Server Error")
            resolve({})
        }
    })
}


const without_params = ({
    script,
    host_params =
    {
        host: "",
        user: "",
        password: "",
        port: 8728
    }
}) => {
    return new Promise((resolver, reject) => {
        try {
            const conn = connection({
                host: host_params.host,
                user: host_params.user,
                password: host_params.password,
                port: host_params.port,
            })

            conn.connect().then(() => {
                conn.write(
                    script
                ).then((get) => {
                    conn.close();
                    resolver(get)
                }).catch((err) => {
                    conn.close();
                    console.log("without_params -> Server Error")
                    resolve({})
                });
            }).catch(err => {
                conn.close();
                console.log("without_params -> Server Error")
                resolve({})
            })
        } catch (e) {
            console.log("without_params -> catch -> Server Error")
            resolve({})
        }
    })
}


module.exports = {
    with_params,
    without_params
}

