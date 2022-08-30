const express = require("express")
const cors = require("cors")

const app = express()
const port = 2000
app.use(cors())
const { connect } = require("./db/connection")
connect()
app.use(express.urlencoded())
app.use(express.json())
const user = require("./routter/users.routes")
app.use('/', user)
app.listen(port, () => {
   console.log(`you port is listening at ${port}`);
})