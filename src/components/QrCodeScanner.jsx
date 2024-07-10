import { useState,useRef,useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { Box } from '@mui/material';

const QrCodeScanner = (args) => {
   const videoRef = useRef(null);
   const [result, setResult] = useState('');

   useEffect(() => {
      const qrScanner = new QrScanner(videoRef.current, result => setResult(result));
      qrScanner.start();
      return () => {
         qrScanner.stop();
      }
   }, []);
   console.log(result);

   useEffect(() => {
      args.setResult(result);
   }, [result]);

   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            width: '50vh',
         }}
      >
         <video ref={videoRef} style={{ width: '100%' }} />
         
      </Box>
   )

}
 
export default QrCodeScanner;