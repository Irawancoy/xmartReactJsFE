import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CustomerPage from '../pages/CustomerPage'
import Navbar from '../components/Navbar'
import MainPage from '../pages/MainPage'
import BelanjaPage from '../pages/BelanjaPage'



function Layout() {
   return (
      <div>

         <Navbar />
         <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/MainPage' element={<MainPage />} />
            <Route path='/Customer' element={<CustomerPage />} />
            <Route path='/Belanja' element={<BelanjaPage/>}/>
            </Routes>
         
      </div>
   
   )
}

export default Layout