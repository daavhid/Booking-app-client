import React from 'react'
import Navbar from './component/Navbar'
import { BrowserRouter, Route,Router, Routes } from 'react-router-dom'
// import { Router } from 'express'
import Home from './pages/home'
import Hotels from './pages/hotels'
import Hotel from './pages/Hotel'
import Login from './pages/Login'

const App = () => {
    
  return (

    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/hotels'>
                <Route index element={<Hotels/>}/>
                <Route path=':id' element={<Hotel/>}/>
            </Route>
            <Route path='/login' element={<Login/>}/>
        </Routes>
        
    </BrowserRouter>
  )
}

export default App