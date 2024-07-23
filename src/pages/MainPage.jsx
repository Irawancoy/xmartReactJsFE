import { Box, Button, Typography } from "@mui/material";
import QrCodeScanner from "../components/QrCodeScanner";
import { useState, useEffect } from "react";
import { getCustomerByQRCode } from "../services/apis";

const MainPage = () => {
   const [result, setResult] = useState('');
   const [isVerified, setIsVerified] = useState(false);

   const [isOpenScanner, setIsOpenScanner] = useState(false)

   // inisialisasi result dari local storage
   useEffect(() => {
      const storedResult = localStorage.getItem('qrCustomer');
      if (storedResult) {
        setResult(storedResult);
        setIsVerified(true);
      }
   }, []);
   
   // simpan ke local storage jika customer ada di database
   useEffect(() => {
      if (result) {
         getCustomerByQRCode(result)
            .then((response) => {
               if (response.data) {
                  localStorage.setItem('qrCustomer', result);
                  setIsVerified(true);
               }
            })
            .catch((error) => {
               console.log(error);
            })
      }
   }, [result])





   const openScanner = () => {
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
            height: '70vh',
         }}
        
      >
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               gap: 2,
               maxWidth: '30%',
               width: '100%',
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