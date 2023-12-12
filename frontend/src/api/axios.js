// Configuro axios para decirle cual es el dominio base al que
// siempre va a consultar (la URL del Backend) y
// en él hago que se establezcan credenciales.

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',

  // Para que establezca las credenciales alli (http://localhost:3000/api).
  withCredentials: true
})

export default instance
