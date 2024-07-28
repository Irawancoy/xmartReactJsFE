import { instanceSpringBoot, instanceExpress } from "./axiosConfig"

// Mengambil URL endpoint dari variabel lingkungan yang didefinisikan di file .env
const apiCustomerSB = import.meta.env.VITE_API_CUSTOMER_SPRINGBOOT
const apiBarangSB = import.meta.env.VITE_API_BARANG_SPRINGBOOT
const apiGraphQLExpress = import.meta.env.VITE_API_GRAPHQL_EXPRESS
const apiTranferData = import.meta.env.VITE_API_TRANFER_DATA_EXPRESS
const apiTransaksiSB = import.meta.env.VITE_API_TRANSAKSI_SPRINGBOOT

// Mendapatkan data customer berdasarkan QR code dari Spring Boot
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

// Mendapatkan data barang berdasarkan RFID dari Spring Boot
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

// Mendapatkan semua data customer dari Spring Boot
export const getAllCustomers = (pageNumber,pageSize) => {
   return instanceSpringBoot
      .get(apiCustomerSB + "/all?pageNumber="+pageNumber+"&pageSize="+pageSize)
      .then((response) => {
         return response
      }).catch((error) => {
         throw error
      })
}

// Mendapatkan semua data barang dari Spring Boot
export const getAllBarang = (pageNumber,pageSize) => {
   return instanceSpringBoot
      .get(apiBarangSB + "/all?pageNumber="+pageNumber+"&pageSize="+pageSize)
      .then((response) => {
         return response
      }).catch((error) => {
         throw error
      })
}

// Mendapatkan semua data transaksi dari Spring Boot
export const getAllTransaksi = (pageNumber,pageSize) => {
   return instanceSpringBoot
      .get(apiTransaksiSB + "/all?pageNumber="+pageNumber+"&pageSize="+pageSize)
      .then((response) => {
         return response
      }).catch((error) => {
         throw error
      })
}

// Menambahkan transaksi ke MongoDB dan Redis menggunakan Express dan GraphQL
export const postTransaksiExpress = (mutation) => {
   return instanceExpress
     .post(apiGraphQLExpress, { query: mutation }) // Mengirimkan mutation dalam body request
     .then((response) => {
       return response;
     })
     .catch((error) => {
       throw error;
     });
 };

// Mendapatkan transaksi berdasarkan QR code menggunakan Express dan GraphQL
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

// Menghapus transaksi berdasarkan _id menggunakan Express dan GraphQL
export const deleteTransaksiExpress = (mutation) => {
   return instanceExpress
      .post(apiGraphQLExpress, { query: mutation })
      .then((response) => {
         return response;
      }).catch((error) => {
         throw error;
      });
}

// Mentransfer transaksi ke PostgreSQL
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

// Memperbarui jumlah barang dalam transaksi menggunakan Express dan GraphQL
export const updateJumlahBarangTransaksi = (mutation) => {
   return instanceExpress
      .post(apiGraphQLExpress, { query: mutation })
      .then((response) => {
         return response;
      }).catch((error) => {
         throw error;
      });
}
