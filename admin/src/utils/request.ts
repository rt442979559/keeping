import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 60000,
  withCredentials: false,
})

export default service
