import React from 'react'
import Navbar from '../components/Navbar'
import HomeDetails
 from '../components/HomeDetails'
const Welcome = () => {
  return (
    <>
      <Navbar links={{home: "Home", logout: "logout"}} />
      <HomeDetails description={{h1: "Form Validaton Using Mern stack", h3: "welcome back"}} />
    </>
  )
}

export default Welcome
