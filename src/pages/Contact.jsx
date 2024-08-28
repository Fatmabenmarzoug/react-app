import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom/cjs/react-router-dom.min'
import Login from './Login'
import Register from './Register'

export default function Contact() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>

  )
}
