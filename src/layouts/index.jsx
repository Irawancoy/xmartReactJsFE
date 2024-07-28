import React from 'react'
import { Routes, Route } from 'react-router-dom' // Mengimpor komponen Routes dan Route untuk routing
import CustomerPage from '../pages/CustomerPage' // Mengimpor halaman CustomerPage
import Navbar from '../components/Navbar' // Mengimpor komponen Navbar
import MainPage from '../pages/MainPage' // Mengimpor halaman MainPage
import BelanjaPage from '../pages/BelanjaPage' // Mengimpor halaman BelanjaPage
import ListCustomerPage from '../pages/ListCustomerPage' // Mengimpor halaman ListCustomerPage
import ListBarangPage from '../pages/ListBarangPage' // Mengimpor halaman ListBarangPage
import ListTransaksiPage from '../pages/ListTransaksiPage' // Mengimpor halaman ListTransaksiPage

function Layout() {
   return (
      <div>
         <Navbar /> {/* Menyertakan Navbar di bagian atas halaman*/}
         <Routes>
            <Route path='/' element={<MainPage />} /> {/*Mendefinisikan route untuk halaman utama*/} 
            <Route path='/MainPage' element={<MainPage />} /> {/*Mendefinisikan route untuk halaman MainPage*/} 
            <Route path='/Customer' element={<CustomerPage />} /> {/*Mendefinisikan route untuk halaman CustomerPage*/}
            <Route path='/Belanja' element={<BelanjaPage />} /> {/*Mendefinisikan route untuk halaman BelanjaPage*/} 
            <Route path='/ListCustomer' element={<ListCustomerPage />} /> {/*Mendefinisikan route untuk halaman ListCustomerPage*/} 
            <Route path='/ListBarang' element={<ListBarangPage />} /> {/*Mendefinisikan route untuk halaman ListBarangPage*/} 
            <Route path='/ListTransaksi' element={<ListTransaksiPage />} /> {/*Mendefinisikan route untuk halaman ListTransaksiPage*/}
         </Routes>
         
         
      </div>
   
   )
}

export default Layout // Mengekspor komponen Layout sebagai komponen default
