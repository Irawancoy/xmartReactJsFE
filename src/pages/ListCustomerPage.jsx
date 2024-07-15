import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const ListCustomerPage = () => {
   return (
      <Grid container justifyContent="center">
         <Grid item xs={12} md={8} lg={8}>
            <Typography
               sx={{
                  textAlign: 'center', marginBottom: 2,
                  fontSize: 24, fontWeight: 'bold',
                  marginTop: 2
               }}
            >List Customer</Typography>
            <TableContainer sx={{ maxWidth: '100%' }}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>QR Code</TableCell>
                        <TableCell>Wallet</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>1234567890</TableCell>
                        <TableCell>100000</TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </TableContainer>
         </Grid>
      </Grid>
   );
}

export default ListCustomerPage;
