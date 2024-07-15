import React from 'react';
import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
 }));


const CustomerPage=()=> {

   const [qrResult, setQrResult] = useState('');
   console.log(qrResult);

   //ambil result dari qr code scanner
   useEffect(() => {
      setQrResult(localStorage.getItem('qrCustomer'));
   }, [])



   return (
      <Box sx={{ flexGrow: 1 ,marginTop:2}}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Item>
               <h1>Profile</h1>
                  <p>QR Code Result: {qrResult}</p>
                  <p>Name: John Doe</p>
                  <p>Wallet: 100000</p>
                 
                 
               </Item>
              
           
            </Grid>
         </Grid>
      </Box>
   )
}

export default CustomerPage;