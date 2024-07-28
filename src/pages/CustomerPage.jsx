import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { getCustomerByQRCode } from '../services/apis'; // Import fungsi untuk mendapatkan data customer berdasarkan QR code

// Styling untuk komponen Paper
const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));

// Komponen utama CustomerPage
const CustomerPage = () => {

   // State untuk menyimpan data customer dan QR code yang disimpan di localStorage
   const [customerData, setCustomerData] = useState([]);
   const [custQRLocalStorage, setCustQRLocalStorage] = useState('');

   // Mengambil QR code dari localStorage saat komponen pertama kali dimuat
   useEffect(() => {
      const storedResult = localStorage.getItem('qrCustomer');
      if (storedResult) {
         setCustQRLocalStorage(storedResult);
      }
   }, [custQRLocalStorage]);

   // Mengambil data customer berdasarkan QR code yang disimpan di state
   useEffect(() => {
      if (custQRLocalStorage) {
         getCustomerByQRCode(custQRLocalStorage)
            .then((response) => {
               if (response.data.data) {
                  setCustomerData(response.data.data);
               }
            })
            .catch((error) => {
               console.log(error);
            });
      }
   }, [custQRLocalStorage]);

   return (
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Item>
                  {/* Menampilkan informasi profil customer */}
                  <h1>Profile Customer</h1>
                  <p>QR Code : {custQRLocalStorage}</p>
                  <p>Name : {customerData.nama}</p>
                  <p>Wallet : {customerData.wallet}</p>
               </Item>
            </Grid>
         </Grid>
      </Box>
   );
}

export default CustomerPage;
