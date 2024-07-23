import { instanceSpringBoot, instanceExpress } from "./axiosConfig"

const apiCustomerSB = import.meta.env.VITE_API_CUSTOMER_SPRINGBOOT
const apiBarangSB = import.meta.env.VITE_API_BARANG_SPRINGBOOT
const apiGraphQLExpress = import.meta.env.VITE_API_GRAPHQL_EXPRESS
const apiTranferData = import.meta.env.VITE_API_TRANFER_DATA_EXPRESS
const apiTransaksiSB = import.meta.env.VITE_API_TRANSAKSI_SPRINGBOOT


// Get Customer By QR Code
export const getCustomerByQRCode = (qrCode) => {
   return instanceSpringBoot
      .get(apiCustomerSB + "/qr-code", {
         params: {
            qrCode: qrCode
         }
      }).then((response) => {
         return response
      }).catch((error) => {
         throw error
      })
}

// Get Barang ByRFID
export const getBarangByRFID = (rfid) => {
   return instanceSpringBoot
      .get(apiBarangSB + "/rfid", {
         params: {
            rfid: rfid
         }
      }).then((response) => {
         return response
      }).catch((error) => {
         throw error
      })
}

// Get All Customers
export const getAllCustomers = (pageNumber,pageSize) => {
   return instanceSpringBoot
      .get(apiCustomerSB + "/all?pageNumber="+pageNumber+"&pageSize="+pageSize)
      .then((response) => {
         return response
      }).catch((error) => {
         throw error
      })
}

// Get All Barang
export const getAllBarang = (pageNumber,pageSize) => {
   return instanceSpringBoot
      .get(apiBarangSB + "/all?pageNumber="+pageNumber+"&pageSize="+pageSize)
      .then((response) => {
         return response
      }).catch((error) => {
         throw error
      })
}

// Get All Transaksi
export const getAllTransaksi = (pageNumber,pageSize) => {
   return instanceSpringBoot
      .get(apiTransaksiSB + "/all?pageNumber="+pageNumber+"&pageSize="+pageSize)
      .then((response) => {
         return response
      }).catch((error) => {
         throw error
      })
}


//post transaksi to mongodb & redis using express
export const postTransaksiExpress = (mutation) => {
   return instanceExpress
     .post(apiGraphQLExpress, { query: mutation }) // Gunakan { query: mutation } untuk mengirim mutation dalam body request
     .then((response) => {
       return response;
     })
     .catch((error) => {
       throw error;
     });
 };
 

// Get Transaksi By QR Code in Express
export const getTransaksiByQRCodeExpress = (query) => {
   console.log(query)
   return instanceExpress
      .post(apiGraphQLExpress, { query })
      .then((response) => {
         return response;
      }).catch((error) => {
         throw error;
      });
};

//delete transaksi by _id using graphql express
export const deleteTransaksiExpress = (mutation) => {
   return instanceExpress
      .post(apiGraphQLExpress, { query: mutation })
      .then((response) => {
         return response;
      }).catch((error) => {
         throw error;
      });
}

//Tranfer transaksi to postgresql 
export const getTranferTransaksi = (qrUser) => {
   const url = apiTranferData + "/" + qrUser
   return instanceExpress
      .get(url)
      .then((response) => {
         return response;
      }).catch((error) => {
         throw error;
      });
}

// Update Jumlah Barang Transaksi
export const updateJumlahBarangTransaksi = (mutation) => {
   return instanceExpress
      .post(apiGraphQLExpress, { query: mutation })
      .then((response) => {
         return response;
      }).catch((error) => {
         throw error;
      });
}






