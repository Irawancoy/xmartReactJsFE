import { Box, Button, ButtonGroup, Grid, TableFooter, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import QrCodeScanner from "../components/QrCodeScanner";
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import { getBarangByRFID } from "../services/apis";
import { postTransaksiExpress } from "../services/apis";
import { getTransaksiByQRCodeExpress } from "../services/apis";
import { deleteTransaksiExpress } from "../services/apis";
import { Delete } from "@mui/icons-material";
import { getTranferTransaksi } from "../services/apis";
import { updateJumlahBarangTransaksi } from "../services/apis";


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
   const [actionSuccess, setActionSuccess] = useState(false);
   const [qrCodeUser, setQrCodeUser] = useState('');
   const [cart, setCart] = useState([]);
   const [refresh, setRefresh] = useState(false);
   const [itemNames, setItemNames] = useState({});

   // get transaksi by qr code in graphql query
   useEffect(() => {
      if (qrCodeUser) {
         const query = `{
            transaksiByQRCode(qr_code: "${qrCodeUser}"){
               _id
               qr_code
               rfid
               harga_satuan
               jumlah
               date
            }
         }`
         getTransaksiByQRCodeExpress(query).then((response) => {
            const transaksi = response.data.data.transaksiByQRCode;
            setCart(transaksi);

            // Fetch item names for each transaction
            transaksi.forEach((item) => {
               fetchItemName(item.rfid);
            });
         }).catch((error) => {
            console.log(error);
         });
      }
   }, [qrCodeUser, refresh]);


   useEffect(() => {
      if (localStorage.getItem('qrCustomer')) {
         setQrCodeUser(localStorage.getItem('qrCustomer'));
      }
   }, []);

   useEffect(() => {
      if (result) {
         getBarangByRFID(result).then((response) => {
            addCart(response.data);
         }).catch((error) => {
            console.log(error);
         });
      }
   }, [result]);

   const openScanner = () => {
      setIsOpenScanner(!isOpenScanner);
   };



   const checkoutOnClick = () => {
      getTranferTransaksi(qrCodeUser).then((response) => {
         setCart([]);
         notifActionSuccess();
      }).catch((error) => {
         console.log(error);
      });
   }

   const notifActionSuccess = () => {
      setActionSuccess(true);
      setTimeout(() => {
         setActionSuccess(false);
      }, 3000);
   }

   const fetchItemName = (rfid) => {
      if (!itemNames[rfid]) {
         getBarangByRFID(rfid).then((response) => {
            setItemNames((prev) => ({
               ...prev,
               [rfid]: response.data.data.namaBarang
            }));
         }).catch((error) => {
            console.log(error);
         });
      }
   };

   // post add cart dengan graphql mutation
   const addCart = (data) => {
      if (cart.some(item => item.rfid === result)) {
         
         const item = cart.find(item => item.rfid === result);
         updateJumlahBarang({ _id: item._id, jumlah: item.jumlah + 1 });
         return;
      }

      const mutation = `
        mutation {
          addTransaksi(
            qr_code: "${qrCodeUser}",
            rfid: "${result}",
            harga_satuan: ${data.data.hargaSatuan},
            jumlah: 1
          ) {
            _id
            qr_code
            rfid
            harga_satuan
            jumlah
            date
          }
        }
      `
      postTransaksiExpress(mutation)
         .then((response) => {
            fetchItemName(result);
            setRefresh((prev) => !prev);
            notifActionSuccess();
         })
         .catch((error) => {
            console.log(error);
         });
   };



   //delete transaksi by _id using graphql express
   const deleteTransaksi = (_id) => {
      const mutation = `
        mutation {
          deleteTransaksi(_id: "${_id}") {
            _id
          }
        }
      `

      deleteTransaksiExpress(mutation)
         .then((response) => {
            setRefresh((prev) => !prev);
            notifActionSuccess();
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const updateJumlahBarang = (data) => {
      if (data.jumlah <= 0) {
         deleteTransaksi(data._id);
         return;
      }

      const mutation = `
        mutation {
          updateJumlahBarangTransaksi(
            _id: "${data._id}",
            jumlah: ${data.jumlah}
          ) {
            _id
            qr_code
            rfid
            harga_satuan
            jumlah
            date
          }
         }
      `
      updateJumlahBarangTransaksi(mutation)
         .then((response) => {
            setRefresh((prev) => !prev);
            notifActionSuccess();
         })
         .catch((error) => {
            console.log(error);
         }
         )
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
                        }}>
                        <Button variant="contained" onClick={openScanner}>
                           {isOpenScanner ? "Close Scanner" : "Open Scanner"}
                        </Button>
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
                  }}>
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
                                 <TableCell>RFID</TableCell>
                                 <TableCell>Harga Satuan</TableCell>
                                 <TableCell>Jumlah</TableCell>
                                 <TableCell>Total Harga</TableCell>
                                 <TableCell>Aksi</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody>
                              {cart.map((item, index) => (
                                 <TableRow key={item._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{itemNames[item.rfid] || 'Loading...'}</TableCell>
                                    <TableCell>{item.rfid}</TableCell>
                                    <TableCell>{item.harga_satuan}</TableCell>
                                    <TableCell>
                                       <ButtonGroup>
                                          <Button
                                             onClick={() => updateJumlahBarang({ _id: item._id, jumlah: item.jumlah - 1 })}
                                             variant="contained"
                                             color="primary"
                                          >
                                             -
                                          </Button>
                                          <Button>{item.jumlah}</Button>
                                          <Button
                                             onClick={() => updateJumlahBarang({ _id: item._id, jumlah: item.jumlah + 1 })}
                                             variant="contained"
                                             color="primary"
                                          >
                                             +
                                          </Button>


                                       </ButtonGroup>
                                       


                                       
                                 

                                    </TableCell>

                                    <TableCell>{item.harga_satuan * item.jumlah}</TableCell>
                                    <TableCell>
                                       <Button
                                          onClick={() => deleteTransaksi(item._id)}
                                          variant="contained"
                                          color="error"
                                          startIcon={<Delete />}
                                       >
                                          Delete
                                       </Button>
                                    </TableCell>
                                 </TableRow>
                              ))}
                              {/* Total */}
                              <TableRow>
                                 <TableCell colSpan={5}>Total</TableCell>
                                 <TableCell>
                                    {cart.reduce((total, item) => total + (item.harga_satuan * item.jumlah), 0)}
                                 </TableCell>
                                 <TableCell></TableCell>
                              </TableRow>
                           </TableBody>
                           <TableFooter>
                              <TableRow>
                                 <TableCell colSpan={7}>
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
         {actionSuccess && (
            <Alert
               severity="success"
               sx={{
                  position: 'fixed',
                  top: 16,
                  right: 16,
                  width: '300px',
               }}>
               Success
            </Alert>
         )}
      </Box>
   );
};

export default BelanjaPage;
