import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 60000,
  withCredentials: false,
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.log(error);
  }
)

export default service
