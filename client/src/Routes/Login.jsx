import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, json, useNavigate } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const history = useNavigate();
    const userLogin = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                //eg. email:email
                email, password 
            })
        })

        const data = res.json();

        if (res.status === 400 || !data) {
            window.alert("Invalid Credential")
        } else {
            window.alert("Login Successfull")
            history("/welcome")
        }
    }
  return (
    <>
    <Navbar links={{home: "Home", login: "Login", register: "Register"}} />
      <form method='POST'>
                <div className="form_container">
                    <div className="form_title">
                        <h1>Log-In</h1>
                    </div>
                    <div className="input_fields">
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input_fields">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="btn">
                        <button type="submit" onClick={userLogin}>Log-in</button>
                        <p>Dont have a account ? <Link to='/registration' >Register </Link></p>
                    </div>

                </div>
            </form>
    </>
  )
}

export default Login
