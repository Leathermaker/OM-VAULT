import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Register,  } from '../screens'


const Router:React.FC = () => {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route index path="/register" element={<Register />} />
      <Route index path="/home" element={<Home />} />
    </Routes>
  )
}

export default Router
