import { Navigate, Outlet } from 'react-router-dom'
// Custom Hook dentro del Context.
import { useAuth } from './context/AuthContext.jsx'

export default function ProtectedRoute () {
  const { loading, isAuthenticated } = useAuth()

  if (loading) return <h1>Loading...</h1>

  // Sino esta autenticado el usuario, redireccionalo a /login.
  if (!loading && !isAuthenticated) return <Navigate to='/login' replace />
  // replace --> no podra volver a la ruta anterior.

  return (
    // Da paso a los componentes que envuelve ProtectedRoute.jsx
    <Outlet />
  )
}
