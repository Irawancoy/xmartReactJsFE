import { useState,useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import { TableFooter, Typography } from "@mui/material";
import { getAllBarang } from "../services/apis";
import TablePagination from '@mui/material/TablePagination';

const ListBarangPage = () => {
   const [barangs, setBarangs] = useState([])
   const [pageNumber, setPageNumber] = useState(0);
   const [pageSize, setPageSize] = useState(7);
   const [totalCount, setTotalCount] = useState(0);
   

   useEffect(() => {
      getAllBarang(pageNumber+1,pageSize).then((response) => {
         setBarangs(response.data.data);
         setTotalCount(response.data.total);
      }).catch((error) => {
         console.log(error);
      });
   }, [pageNumber, pageSize]);

   const handleChangePage = (event, newPage) => {
      setPageNumber(newPage);
   }

   const handleChangeRowsPerPage = (event) => {
      setPageSize(parseInt(event.target.value))
      setPageNumber(0);
   }


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
}

export default ListBarangPage;
