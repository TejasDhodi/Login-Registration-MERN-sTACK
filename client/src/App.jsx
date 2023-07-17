import React from 'react'
import Home from './Routes/Home'
import Registration from './Routes/Registration'
import Login from './Routes/Login'
import Welcome from './Routes/Welcome'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
      </Routes>
    </>
  )
}

export default App
