import axios from "axios"

// Membuat instance axios khusus untuk berinteraksi dengan API Spring Boot
const instanceSpringBoot = axios.create({
   baseURL: import.meta.env.VITE_API_URL_SPRINGBOOT // Mengatur baseURL dari instance axios ke URL API Spring Boot yang diambil dari file .env
})

// Membuat instance axios khusus untuk berinteraksi dengan API Express
const instanceExpress = axios.create({
   baseURL: import.meta.env.VITE_API_URL_EXPRESS // Mengatur baseURL dari instance axios ke URL API Express yang diambil dari file .env
})

// Mengekspor instance axios yang telah dibuat agar bisa digunakan di seluruh aplikasi
export { instanceSpringBoot, instanceExpress }
