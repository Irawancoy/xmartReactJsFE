import { Box, Button, Grid, Typography } from "@mui/material";
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

   const openScanner = () => {
     if (!isOpenScanner) {
       setIsOpenScanner(true);
     } else {
       setIsOpenScanner(false);
     }
   };

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
                        }} >
                        {isOpenScanner ? <Button variant="contained" onClick={openScanner}>Close Scanner</Button> : <Button variant="contained" onClick={openScanner}>Open Scanner</Button>}
                        {isOpenScanner && <QrCodeScanner setResult={setResult} />}
                     </Box>
                     
                     </Box>
               </Item>
            </Grid>
            {/* Keranjang */}
            <Grid item xs={12} md={8}
            >
               <Item
                  sx={{
               minHeight: '70vh',
                  }
                  }
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
                                 <TableCell>Jumlah</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              <TableRow>
                                 <TableCell>1</TableCell>
                                 <TableCell>Barang 1</TableCell>
                                 <TableCell>1</TableCell>
                              </TableRow>
                           </TableBody>
                        </Table>
                     </TableContainer>
                     
                  </Box>
               </Item>
            </Grid>
         </Grid>
      </Box>
   );
};

export default BelanjaPage;
