const express = require('express')
const cors = require('cors')
const BodyParser = require('body-parser')
const app = express()
const { PATH, PORT } = require('./config/config')

app.use(cors())
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

// NOTE Routers
app.use(PATH, require('./routes'))
app.get(PATH, (req, res) => res.send('CORE ISP Mikrotik Ok'))


// NOTE GET Request Not Found
app.get('*', function (req, res) {
    console.log("Not Found Page")
    res.json({
        success: false,
        message: 'No Route Found'
    })
});

// NOTE POST Request Not Found
app.post('*', function (req, res) {
    console.log("Not Found Page")
    res.json({
        success: false,
        message: 'No Route Found'
    })
});


app.listen(PORT, () => 
    console.log(`CORE ISP Mikrotik -> listening on port ${PORT}!`)
)
