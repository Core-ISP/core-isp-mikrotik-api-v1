const connection = require('../function/connection');


const with_params = async ({
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
                        console.log("with_params -> Server Exec Error", err)
                        resolve([])
                    });
                })
                .catch(err => {
                    conn.close();
                    console.log("with_params -> Server Connect Error", err)
                    resolve([])
                })
        } catch (e) {
            console.log("with_params -> catch -> Server Catch Error")
            resolve([])
        }
    })
}


const without_params = async ({
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
                    console.log("without_params -> Server Exec Error", err)
                    resolver([])
                });
            }).catch(err => {
                conn.close();
                console.log("without_params -> Server Connect Error", err)
                resolver([])
            })
        } catch (e) {
            console.log("without_params -> catch -> Server Catch Error")
            resolver([])
        }
    })
}


module.exports = {
    with_params,
    without_params
}

