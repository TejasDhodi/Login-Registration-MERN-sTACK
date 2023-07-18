const dotenv = require('dotenv')
const express = require("express")
const app = express();

const bodyParser = require("body-parser")

dotenv.config({path: "./.env"})

require("./database/connection")
const Register = require("./registrationSchema/schema")
const PORT = process.env.PORT || 6000

app.use(express.json())
app.use(require("./routes/auth"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.listen(PORT, () => {
    console.log("Jay Shree Ram ");
})