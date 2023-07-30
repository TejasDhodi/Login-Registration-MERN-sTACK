const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path: "../.env"})
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log("connection established");
}).catch((err) => {
    console.log("failed to connect");
})