import { Box, Button, Typography } from "@mui/material";
import QrCodeScanner from "../components/QrCodeScanner";
import { useState,useEffect } from "react";

const MainPage = () => {
   const [result, setResult] = useState('');
   const [isVerified, setIsVerified] = useState(false);
   console.log(result);
   
   const [isOpenScanner, setIsOpenScanner] = useState(false)

   // inisialisasi result dari local storage
   useEffect(() => {
      const storedResult = localStorage.getItem('qrCustomer');
      if (storedResult) {
        setResult(storedResult);
        setIsVerified(true);
      }
   }, []);
   
   // simpan ke local storage
   useEffect(() => {
      localStorage.setItem('qrCustomer', result);
      if (result) {
         setIsVerified(true);
      }
   }, [result])





   const openScanner = () => {
      console.log('Open Scanner');
      if (!isOpenScanner) {
         setIsOpenScanner(true);
         setIsVerified(false);
      }else{
         setIsOpenScanner(false);
      }
   }

   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
         }}
        
      >
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               gap: 2,
            }}
         >

         {isOpenScanner ? <Button variant='outlined' onClick={openScanner}>Close Scanner</Button> : <Button variant='contained' onClick={openScanner}>Open Scanner</Button>
         }
         {isOpenScanner ? <QrCodeScanner
            setResult={setResult}/> : null}
       <Typography variant='h6'>
          {isVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
        </Typography>
         </Box>
    
    </Box>
   );
}

export default MainPage;