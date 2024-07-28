import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import { TableFooter, Typography } from "@mui/material";
import { getAllBarang } from "../services/apis"; // Import fungsi untuk mendapatkan data barang dari API
import TablePagination from '@mui/material/TablePagination';

const ListBarangPage = () => {
   // State untuk menyimpan data barang, nomor halaman, ukuran halaman, dan jumlah total data
   const [barangs, setBarangs] = useState([]);
   const [pageNumber, setPageNumber] = useState(0);
   const [pageSize, setPageSize] = useState(7);
   const [totalCount, setTotalCount] = useState(0);

   // useEffect untuk mengambil data barang saat halaman pertama kali dimuat atau saat pageNumber/pageSize berubah
   useEffect(() => {
      getAllBarang(pageNumber + 1, pageSize) // Memanggil API dengan nomor halaman dan ukuran halaman
         .then((response) => {
            setBarangs(response.data.data); // Menyimpan data barang yang diambil dari API ke state barangs
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
                     {barangs.map((barang, index) => (
                        <TableRow key={index}>
                           <TableCell>{index + 1}</TableCell>
                           <TableCell>{barang.rfid}</TableCell>
                           <TableCell>{barang.namaBarang}</TableCell>
                           <TableCell>{barang.hargaSatuan}</TableCell>
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

export default ListBarangPage;
