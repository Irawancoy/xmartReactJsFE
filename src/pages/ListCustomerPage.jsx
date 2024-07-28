import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import { TableFooter, Typography } from "@mui/material";
import { getAllCustomers } from "../services/apis"; // Import fungsi untuk mendapatkan data pelanggan dari API
import TablePagination from '@mui/material/TablePagination';

const ListCustomerPage = () => {
   // State untuk menyimpan nomor halaman, ukuran halaman, jumlah total data, dan data pelanggan
   const [pageNumber, setPageNumber] = useState(0);
   const [pageSize, setPageSize] = useState(7);
   const [totalCount, setTotalCount] = useState(0);
   const [customers, setCustomers] = useState([]);

   // useEffect untuk mengambil data pelanggan saat halaman pertama kali dimuat atau saat pageNumber/pageSize berubah
   useEffect(() => {
      getAllCustomers(pageNumber + 1, pageSize) // Memanggil API dengan nomor halaman dan ukuran halaman
         .then((response) => {
            setCustomers(response.data.data); // Menyimpan data pelanggan yang diambil dari API ke state customers
            setTotalCount(response.data.total); // Menyimpan jumlah total data ke state totalCount
         })
         .catch((error) => {
            console.log(error); // Menangani kesalahan jika terjadi
         });
   }, [pageNumber, pageSize]);

   // Fungsi untuk mengubah nomor halaman
   const handleChangePage = (event, newPage) => {
      setPageNumber(newPage);
   };

   // Fungsi untuk mengubah ukuran halaman
   const handleChangeRowsPerPage = (event) => {
      setPageSize(parseInt(event.target.value));
      setPageNumber(0); // Reset nomor halaman ke 0 saat ukuran halaman berubah
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
                     {customers.map((customer, index) => (
                        <TableRow key={index}>
                           <TableCell>{index + 1}</TableCell> {/* Nomor urut pelanggan */}
                           <TableCell>{customer.nama}</TableCell> {/* Nama pelanggan */}
                           <TableCell>{customer.qrCode}</TableCell> {/* QR Code pelanggan */}
                           <TableCell>{customer.wallet}</TableCell> {/* Wallet pelanggan */}
                        </TableRow>
                     ))}
                  </TableBody>
                  <TableFooter>
                     <TableRow>
                        <TablePagination
                           rowsPerPageOptions={[7, 14, 21]} // Pilihan jumlah baris per halaman
                           count={totalCount} // Total jumlah data
                           rowsPerPage={pageSize} // Jumlah baris per halaman saat ini
                           page={pageNumber} // Nomor halaman saat ini
                           onPageChange={handleChangePage} // Fungsi untuk mengubah halaman
                           onRowsPerPageChange={handleChangeRowsPerPage} // Fungsi untuk mengubah ukuran halaman
                        />
                     </TableRow>
                  </TableFooter>
               </Table>
            </TableContainer>
         </Grid>
      </Grid>
   );
}

export default ListCustomerPage;
