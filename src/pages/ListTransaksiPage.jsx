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
import { getAllTransaksi } from "../services/apis"; // Import fungsi untuk mendapatkan data transaksi dari API

const ListTransaksiPage = () => {
   // State untuk menyimpan nomor halaman, ukuran halaman, jumlah total data, dan data transaksi
   const [pageNumber, setPageNumber] = useState(0); 
   const [pageSize, setPageSize] = useState(7);
   const [transaksis, setTransaksis] = useState([]);
   const [totalCount, setTotalCount] = useState(0);

   // useEffect untuk mengambil data transaksi saat halaman pertama kali dimuat atau saat pageNumber/pageSize berubah
   useEffect(() => {
      getAllTransaksi(pageNumber + 1, pageSize) // Memanggil API dengan nomor halaman dan ukuran halaman
         .then((response) => {
            setTransaksis(response.data.data); // Menyimpan data transaksi yang diambil dari API ke state transaksis
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
                           <TableCell>{index + 1 + (pageNumber * pageSize)}</TableCell> {/* Nomor urut transaksi dengan penyesuaian halaman */}
                           <TableCell>{transaksi.namaCustomer}</TableCell> {/* Nama customer */}
                           <TableCell>{transaksi.namaBarang}</TableCell> {/* Nama barang */}
                           <TableCell>{transaksi.hargaSatuan}</TableCell> {/* Harga satuan barang */}
                           <TableCell>{transaksi.jumlah}</TableCell> {/* Jumlah barang */}
                           <TableCell>{transaksi.date}</TableCell> {/* Waktu transaksi */}
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
};

export default ListTransaksiPage;
