import { createContext, useContext, useState, useEffect } from 'react'
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest
} from '../api/auth.js'
import Cookies from 'js-cookie'

export const AuthContext = createContext()

// Para llamar este Context.
// Para usar las variables y funciones que exporta globalmente este contexto solo debo llamar este Custom Hook.
export const useAuth = () => {
  const context = useContext(AuthContext)

  // Debes envolver con AuthProvider los componentes que accederan a las variable y funciones globales.
  if (!context) throw new Error('useAuth must be used within a AuthProvider.')

  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null) // user global.
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  // Apoyo para lograra pasar a las rutas protegidas luego de usuario estar login.
  const [loading, setLoading] = useState(true)

  // Clear errors after 5 seconds.
  useEffect(() => {
    if (errors.length > 0) {
      // Se establece el timer.
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer) // Destruir el Timeout (limpia el timer).
    }
  }, [errors])

  const signup = async (user) => {
    try {
      const res = await registerRequest(user)
      if (res.status === 200) {
        console.log(res.data)
        setUser(res.data)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.log(error.response.data)
      setErrors(error.response.data.message)
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user)
      setUser(res.data)
      setIsAuthenticated(true)
      console.log(res)
    } catch (error) {
      console.log(error)
      setErrors(error.response.data.message)
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  // Se ejecuta cada vez que cargue la pagina.
  useEffect(() => {
    // Tengo que hacer esta funcion y ejecutarla aqui debajo
    // para poder usar async - await dentro de useEffect.
    const checkLogin = async () => {
      // Consigue las cookies del navegador
      // desde Application/Storage/Cookies/el_dominio_en_que_corre_el_frontend
      // con la ayuda del npm js-cookie.
      const cookies = Cookies.get()

      if (!cookies.token) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
        return
      }

      try {
        // Estoy aqui porque se que hay un token en el navegador. Envialo al Backend.
        // Devolvera el user (id, email y username) al que pertenece el token; si este existe en DB.
        const res = await verifyTokenRequest(cookies.token)

        if (!res.data) {
          setIsAuthenticated(false)
          setUser(null)
          setLoading(false)
          return
        }

        setIsAuthenticated(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
        // console.log(error)
      }
    }

    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
