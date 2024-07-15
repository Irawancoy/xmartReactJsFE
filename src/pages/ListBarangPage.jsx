import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const ListBarangPage = () => {
   return (
      <Grid container justifyContent="center">
         <Grid item xs={12} md={8} lg={8}>
            <Typography
               sx={{
                  textAlign: 'center', marginBottom: 2,
                  fontSize: 24, fontWeight: 'bold',
                  marginTop: 2
               }}
            >List Barang</Typography>
            <TableContainer sx={{ maxWidth: '100%' }}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>RFID</TableCell>
                        <TableCell>Nama Barang</TableCell>
                        <TableCell>Harga</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>1234567890</TableCell>
                        <TableCell>Barang 1</TableCell>
                        <TableCell>10000</TableCell>
                      
                     </TableRow>
                  </TableBody>
               </Table>
            </TableContainer>
         </Grid>
      </Grid>
   );
}

export default ListBarangPage;
