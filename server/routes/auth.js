const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const cors = require("cors")
const router = express.Router();

// To parse the json data
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json())

require("../database/connection")
const Register = require("../registrationSchema/schema");

router.use(cookieParser());
router.use(cors());
router.get("/", (req, res) => {
    res.send("Routing")
})
// Using Promises
/*
router.post("/register", (req, res) => {
    const { userName, email, password, confirmPassword } = req.body;

    // Input Fields validation
    if (!userName || !email || !password || !confirmPassword) {
        return res.status(422).json({ error: "All Fields Are mandatory" })
    }

    // Email Validation for unique email
    Register.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ error: "Email alredy exist" })
            }

            // Creating Instance Of user
            const register = new Register({ userName, email, password, confirmPassword });

            register.save().then(() => {
                res.status(200).json({ message: "user registered successfully" })
            }).catch((err) => res.status(500).json({ message: "failed to register" }))
        }).catch(err => { console.log(err); })


        
    console.log(req.body);
    
})
*/

/* Using Async await*/
// Registration 
router.post("/register", async (req, res) => {
    const { userName, email, password, confirmPassword } = req.body;

    // Input Fields validation
    if (!userName || !email || !password || !confirmPassword) {
        return res.status(422).json({ error: "All Fields Are mandatory" })
    }

    try {

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(406).json({ error: "Invalid email format" });
        }

        // Password validation
        // Checking the length of password
        const passwordMinLength = 8;
        if (password.length < passwordMinLength) {
            return res.status(411).json({ error: `Password should be at least ${passwordMinLength} characters long` });
        }

        // Checking weather the password contains any number and special character or not
        const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordPattern.test(password)) {
            return res.status(412).json({ error: "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
        }

        // Checking if email already exist orr not
        const userExist = await Register.findOne({ email: email })
        if (userExist) {
            return res.status(409).json({ error: "Email alredy exist" })
        } else if (password != confirmPassword) {
            return res.status(401).json({ error: "both password should be same" })
        } else {
            // Creating instance of user and storing them in DB
            const register = new Register({ userName, email, password, confirmPassword });

            await register.save();
            res.status(201).json({ message: "user registered successfully" });
        }

    } catch (error) {
        console.log(error);
    }

    console.log(req.body);

})

// Login 
router.post("/login", async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "all fields are mandatory" })
        }

        const userLogin = await Register.findOne({ email: email })

        console.log(userLogin);
        if (userLogin) {

            const matchPass = await bcrypt.compare(password, userLogin.password);

            // For JWT
            const token = await userLogin.generateAuthToken();
            console.log(token);

            // For Cookie
            res.cookie("jwtToken", token, {
                expires: new Date(Date.now() + 25892000000),
                secure: false,
                httpOnly: true
            })
            console.log(req.cookies);

            if (!matchPass) {
                return res.status(400).json({ message: "invalid cradential" })
            } else {
                console.log("Logged in successfully");
                return res.status(201).json({ message: "login successfully" })
            }

        } else {
            return res.status(400).json({ message: "invalid cradential" })
        }

    } catch (error) {
        console.log(error);
    }
})

// Logout
router.get("/logout", (req, res) => {
    res.clearCookie("jwtToken", {path: "/"})
    res.status(200).send("logout successfully")
})

module.exports = router;