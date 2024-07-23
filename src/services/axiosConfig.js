import axios from "axios"

const instanceSpringBoot = axios.create({
   baseURL: import.meta.env.VITE_API_URL_SPRINGBOOT
})

const instanceExpress = axios.create({
   baseURL: import.meta.env.VITE_API_URL_EXPRESS
})

export { instanceSpringBoot, instanceExpress }