import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Register } from '../screens'


const Router:React.FC = () => {
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default Router
