import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom'
const Registration = () => {
    const history = useNavigate();
    const [input, setInput] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        console.log(name, value);

        setInput({ ...input, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { userName, email, password, confirmPassword } = input;

        const res = await fetch("https://login-registration-356l.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName, email, password, confirmPassword
            })

        })
        const data = await res.json();

        if (res.status === 422 || !data) {
            window.alert("Invalid Credential")
            console.log("Invalid Credential");
        } else if(res.status === 406) {
            window.alert("invalid Email format")
        } else if (res.status === 409) {
            window.alert("Email alredy exist")
        } else if (res.status === 411) {
            window.alert("Password should be at least 8 characters long")
        } else if(res.status === 412) {
            window.alert("Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character")
        } else if (res.status === 401) {
            window.alert("Both Password should be same")
        } else {
            window.alert("Successfull Registration")
            console.log("Successfull Registration");

            history("/login")
        }
        console.log(input);
    }

    return (
        <>
            <Navbar links={{home: "Home", login: "Login", register: "Register"}} />
            <form method='POST'>
                <div className="form_container register">
                    <div className="form_title">
                        <h1>Register</h1>
                    </div>
                    <div className="input_fields">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="userName" id="name" value={input.name} onChange={handleInputs} required />
                    </div>
                    <div className="input_fields">
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" name="email" id="email" value={input.email} onChange={handleInputs} required />
                    </div>
                    <div className="input_fields">
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" value={input.password} onChange={handleInputs} required />
                    </div>
                    <div className="input_fields">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={input.confirmPassword} onChange={handleInputs} required />
                    </div>
                    <div className="btn">
                        <button type="submit" onClick={handleSubmit}>Register</button>
                        <p>already have a account ? <Link to='/login' >Log-in </Link></p>
                    </div>

                </div>
            </form>
        </>
    )
}

export default Registration
