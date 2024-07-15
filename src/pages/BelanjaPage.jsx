import { Box, Button, Grid, TableFooter, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import QrCodeScanner from "../components/QrCodeScanner";
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   ...theme.typography.body2,
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));

const BelanjaPage = () => {

   const [isOpenScanner, setIsOpenScanner] = useState(false);
   const [result, setResult] = useState('');
   const [checkoutSuccess, setCheckoutSuccess] = useState(false);

   const openScanner = () => {
     if (!isOpenScanner) {
       setIsOpenScanner(true);
     } else {
       setIsOpenScanner(false);
     }
   };

   const checkoutOnClick = () => {
      setCheckoutSuccess(true);
      setTimeout(() => {
         setCheckoutSuccess(false);
      }, 3000);
   }

   return (
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
         <Grid container spacing={2}>
            {/* Scanner */}
            <Grid item xs={12} md={4}>
               <Item>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '10vh',
                     }}>
                     <Box 
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           justifyContent: 'center',
                           alignItems: 'center',
                           gap: 2,
                           width: '50%',
                        }} >
                        {isOpenScanner ? <Button variant="contained" onClick={openScanner}>Close Scanner</Button> : <Button variant="contained" onClick={openScanner}>Open Scanner</Button>}
                        {isOpenScanner && <QrCodeScanner setResult={setResult} />}
                     </Box>
                     
                     </Box>
               </Item>
            </Grid>
            {/* Keranjang */}
            
            <Grid item xs={12} md={8}>
               <Item
                  sx={{
                     minHeight: '70vh',
                  }}
               >
                  <Box 
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                     }}>
                     <Typography variant="h5">Keranjang</Typography>
                     
                     <TableContainer component={Paper}>
                        <Table>
                           <TableHead>
                              <TableRow>
                                 <TableCell>No</TableCell>
                                 <TableCell>Nama Barang</TableCell>
                                 <TableCell>Harga Satuan</TableCell>
                                 <TableCell>Jumlah</TableCell>
                                 <TableCell>Total Harga</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              <TableRow>
                                 <TableCell>1</TableCell>
                                 <TableCell>Barang 1</TableCell>
                                 <TableCell>10000</TableCell>
                                 <TableCell>1</TableCell>
                                 <TableCell>10000</TableCell>
                              </TableRow>
                              <TableRow>
                                 <TableCell>2</TableCell>
                                 <TableCell>Barang 2</TableCell>
                                 <TableCell>20000</TableCell>
                                 <TableCell>2</TableCell>
                                 <TableCell>40000</TableCell>
                              </TableRow>
                              {/* Total */}
                              <TableRow>
                                 <TableCell colSpan={4}>Total</TableCell>
                                 <TableCell>50000</TableCell>
                              </TableRow>
                           </TableBody>

                           <TableFooter>
                              <TableRow>
                                 <TableCell colSpan={5}>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                       <Button onClick={checkoutOnClick} variant="contained">Checkout</Button>
                                    </Box>
                                 </TableCell>
                              </TableRow>
                           </TableFooter>
                        </Table>
                     </TableContainer>
                  </Box>
               </Item>
            </Grid>
         </Grid>
         {checkoutSuccess && (
            <Alert 
               severity="success" 
               sx={{ 
                  position: 'fixed', 
                  top: 16, 
                  right: 16, 
                  width: '300px',
               }}
            >
               Checkout Berhasil 
            </Alert>
         )}
      </Box>
   );
};

export default BelanjaPage;
