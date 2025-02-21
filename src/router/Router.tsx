import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Register,  } from '../screens'


const Router:React.FC = () => {
  return (
    <Routes>
      <Route  path="/login" element={<Login />} />
      <Route index path="/" element={<Register />} />
    </Routes>
  )
}

export default Router
