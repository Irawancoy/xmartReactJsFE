import React from 'react';
import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { getCustomerByQRCode } from '../services/apis';


const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
 }));


const CustomerPage=()=> {

   const [customerData, setCustomerData] = useState([]);
   const [custQRLocalStorage, setCustQRLocalStorage] = useState('')


   //ambil result dari qr code scanner
   useEffect(() => {
      const storedResult = localStorage.getItem('qrCustomer')
      if (storedResult) {
         setCustQRLocalStorage(storedResult)
      }
   }, [custQRLocalStorage]);

   //ambil data customer dari qr code
   useEffect(() => {
      if (custQRLocalStorage) {
         getCustomerByQRCode(custQRLocalStorage)
            .then((response) => {
               if (response.data.data) {
                  setCustomerData(response.data.data)
               }
            })
            .catch((error) => {
               console.log(error)
            })
      }
   }, [custQRLocalStorage])



   return (
      <Box sx={{ flexGrow: 1 ,marginTop:2}}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Item>
             
                  <h1>Profile Customer</h1>
                  <p>QR Code : {custQRLocalStorage}</p>
                  <p>Name : {customerData.nama}</p>
                  <p>Wallet : {customerData.wallet}</p>
                 
                 
               </Item>
              
           
            </Grid>
         </Grid>
      </Box>
   )
}

export default CustomerPage;