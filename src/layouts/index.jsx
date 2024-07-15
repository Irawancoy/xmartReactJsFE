import React from 'react'
import { Routes, Route } from 'react-router-dom'
import CustomerPage from '../pages/CustomerPage'
import Navbar from '../components/Navbar'
import MainPage from '../pages/MainPage'
import BelanjaPage from '../pages/BelanjaPage'
import ListCustomerPage from '../pages/ListCustomerPage'
import ListBarangPage from '../pages/ListBarangPage'
import ListTransaksiPage from '../pages/ListTransaksiPage'



function Layout() {
   return (
      <div>

         <Navbar />
         <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/MainPage' element={<MainPage />} />
            <Route path='/Customer' element={<CustomerPage />} />
            <Route path='/Belanja' element={<BelanjaPage />} />
            <Route path='/ListCustomer' element={<ListCustomerPage />} />
            <Route path='/ListBarang' element={<ListBarangPage />} />
            <Route path='/ListTransaksi' element={<ListTransaksiPage />} />
         </Routes>
         
         
      </div>
   
   )
}

export default Layout