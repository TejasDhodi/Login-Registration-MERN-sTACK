import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ links }) => {
  const history = useNavigate();
  
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "GET"
      })

      const data = res.text();
      if (res.status === 200 || data) {
        window.alert("logged out successfully")
      }
      history("/")

      console.log("logged out");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <nav className="navbar">
        <ul>
          <li><Link to="/">{links.home}</Link></li>
          <li><Link to="/login">{links.login}</Link></li>
          <li><Link to="/register">{links.register}</Link></li>
          <li><Link onClick={logout}>{links.logout}</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
