import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import { TableFooter, Typography } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import { getAllTransaksi } from "../services/apis";

const ListTransaksiPage = () => {
   const [pageNumber, setPageNumber] = useState(0); 
   const [pageSize, setPageSize] = useState(7);
   const [transaksis, setTransaksis] = useState([]);
   const [totalCount, setTotalCount] = useState(0);

   useEffect(() => {
      getAllTransaksi(pageNumber + 1, pageSize).then((response) => {
         setTransaksis(response.data.data);
         setTotalCount(response.data.total);
      }).catch((error) => {
         console.log(error);
      });
   }, [pageNumber, pageSize]);

   const handleChangePage = (event, newPage) => {
      setPageNumber(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setPageSize(parseInt(event.target.value));
      setPageNumber(0);
   };

   return (
      <Grid container justifyContent="center">
         <Grid item xs={12} md={8} lg={8}>
            <Typography
               sx={{
                  textAlign: 'center', marginBottom: 2,
                  fontSize: 24, fontWeight: 'bold',
                  marginTop: 2
               }}
            >
               List Transaksi
            </Typography>
            <TableContainer sx={{ maxWidth: '100%' }}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Nama Customer</TableCell>
                        <TableCell>Nama Barang</TableCell>
                        <TableCell>Harga Satuan</TableCell>
                        <TableCell>Jumlah</TableCell>
                        <TableCell>Waktu</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {transaksis.map((transaksi, index) => (
                        <TableRow key={index}>
                           <TableCell>{index + 1 + (pageNumber * pageSize)}</TableCell>
                           <TableCell>{transaksi.namaCustomer}</TableCell>
                           <TableCell>{transaksi.namaBarang}</TableCell>
                           <TableCell>{transaksi.hargaSatuan}</TableCell>
                           <TableCell>{transaksi.jumlah}</TableCell>
                           <TableCell>{transaksi.date}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
                  <TableFooter>
                     <TableRow>
                        <TablePagination
                           rowsPerPageOptions={[7, 14, 21]}
                           count={totalCount}
                           rowsPerPage={pageSize}
                           page={pageNumber}
                           onPageChange={handleChangePage}
                           onRowsPerPageChange={handleChangeRowsPerPage}

                        />
                     </TableRow>
                  </TableFooter>
               </Table>
            </TableContainer>
         </Grid>
      </Grid>
   );
};

export default ListTransaksiPage;
