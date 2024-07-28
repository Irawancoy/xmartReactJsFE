import { Box, Button, Typography } from "@mui/material";
import QrCodeScanner from "../components/QrCodeScanner";
import { useState, useEffect } from "react";
import { getCustomerByQRCode } from "../services/apis";

const MainPage = () => {
  const [result, setResult] = useState(''); // State untuk menyimpan hasil scan QR code
  const [isVerified, setIsVerified] = useState(false); // State untuk status verifikasi customer

  const [isOpenScanner, setIsOpenScanner] = useState(false) // State untuk membuka/menutup scanner

  // Inisialisasi result dari local storage saat komponen pertama kali dimuat
  useEffect(() => {
    const storedResult = localStorage.getItem('qrCustomer');
    if (storedResult) {
      setResult(storedResult);
      setIsVerified(true);
    }
  }, []);
  
  // Simpan ke local storage jika customer ada di database setelah QR code discan
  useEffect(() => {
    if (result) {
      getCustomerByQRCode(result)
        .then((response) => {
          if (response.data) {
            localStorage.setItem('qrCustomer', result); // Simpan hasil scan ke local storage
            setIsVerified(true); // Set status verifikasi menjadi true
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [result]);

  // Fungsi untuk membuka/menutup scanner
  const openScanner = () => {
    if (!isOpenScanner) {
      setIsOpenScanner(true);
      setIsVerified(false);
    } else {
      setIsOpenScanner(false);
    }
  };

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
        {/* Tombol untuk membuka/menutup scanner */}
        {isOpenScanner ? (
          <Button variant='outlined' onClick={openScanner}>Close Scanner</Button>
        ) : (
          <Button variant='contained' onClick={openScanner}>Open Scanner</Button>
        )}
        
        {/* Komponen QrCodeScanner yang akan aktif saat scanner dibuka */}
        {isOpenScanner ? <QrCodeScanner setResult={setResult} /> : null}
        
        {/* Menampilkan status verifikasi */}
        <Typography variant='h6'>
          {isVerified ? 'Terverifikasi' : 'Belum Terverifikasi'}
        </Typography>
      </Box>
    </Box>
  );
}

export default MainPage;
