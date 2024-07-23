import { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { Box } from '@mui/material';

const QrCodeScanner = ({ setResult }) => {
   const videoRef = useRef(null);
   const [result, setResultState] = useState('');

   useEffect(() => {
     const qrScanner = new QrScanner(videoRef.current, result => {
        setResultState(result);
        setResult(result);
     });
     qrScanner.start();

     return () => {
        qrScanner.stop();
     };
  }, []);

   useEffect(() => {
     if (result) {
        // Reset result after 5 seconds
        const timeout = setTimeout(() => {
           setResultState('');
           setResult('');
        }, 5000);

        return () => clearTimeout(timeout);
     }
  }, [result]);

   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
         }}
      >
         <video ref={videoRef} style={{ width: '100%', height: '100%' }} />
     </Box>
   );
};

export default QrCodeScanner;
