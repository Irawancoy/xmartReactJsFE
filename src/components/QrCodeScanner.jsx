import { useState, useRef, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import { Box } from '@mui/material';

// Komponen QrCodeScanner menerima prop 'setResult' untuk mengatur hasil scan QR code di komponen induk
const QrCodeScanner = ({ setResult }) => {
  const videoRef = useRef(null); // Menggunakan useRef untuk mereferensikan elemen video
  const [result, setResultState] = useState(''); // State untuk menyimpan hasil scan sementara

  useEffect(() => {
    // Membuat instance QrScanner dengan elemen video dan callback saat QR code terdeteksi
    const qrScanner = new QrScanner(videoRef.current, result => {
      setResultState(result); // Mengatur hasil scan di state lokal
      setResult(result); // Mengatur hasil scan di state komponen induk
    });
    qrScanner.start(); // Memulai scanning

    return () => {
      qrScanner.stop(); // Menghentikan scanning saat komponen di-unmount
    };
  }, [setResult]);

  useEffect(() => {
    if (result) {
      // Mengatur timeout untuk mereset hasil scan setelah 5 detik
      const timeout = setTimeout(() => {
        setResultState('');
        setResult('');
      }, 5000);

      return () => clearTimeout(timeout); // Membersihkan timeout saat komponen di-unmount atau result berubah
    }
  }, [result, setResult]);

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
      {/* Elemen video untuk menampilkan feed dari kamera */}
      <video ref={videoRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default QrCodeScanner;
