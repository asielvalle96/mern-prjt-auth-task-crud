// Ya no uso esto porque configuré axios en frontend/src/api/axios.js.
// import axios from 'axios'
// const API = 'http://localhost:3000/api' // URL del Backend.

// Trea unas configuraciones que le hice a axios en frontend/src/api/axios.js.
import axios from './axios.js'

// post | http://localhost:3000/api/register
export const registerRequest = user => axios.post('/register', user)

// post | http://localhost:3000/api/login
export const loginRequest = user => axios.post('/login', user)

// get | http://localhost:3000/api/verify-token
export const verifyTokenRequest = () => axios.get('/verify-token')
