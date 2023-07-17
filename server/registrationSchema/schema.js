const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registeredUser = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// Hashing The Password
registeredUser.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12)
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12)
    }
    next();
    console.log('Hashing done');
})

// Generating Token
registeredUser.methods.generateAuthToken = async function () {
    try {
        let myToken = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: myToken});
        await this.save();
        return myToken;
    } catch (error) {
        console.log(error);
    }
}

const Register = new mongoose.model("Register", registeredUser);

module.exports = Register;