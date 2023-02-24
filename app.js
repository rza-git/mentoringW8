const express = require('express')
const app = express()
const port = 3000;
const router = require("./query.js")

// prefix, router

// Menerima request body ==> JSON
app.use(express.json())
// Menerima request body ==> urlencoded
app.use(express.urlencoded({extended: true}))

app.use(router);
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})