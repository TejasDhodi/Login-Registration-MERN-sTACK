import React from 'react'
import Navbar from '../components/Navbar'
import HomeDetails from '../components/HomeDetails'
const Home = () => {
  return (
    <>
      <Navbar links={{home: "Home", login: "Login", register: "Register"}} />
      <HomeDetails description={{h1: "Form Validaton Using Mern stack", h3: "welcome"}} />
    </>
  )
}

export default Home
