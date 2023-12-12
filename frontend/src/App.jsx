// Rutas en React using React Router Dom.
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Contextos
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TasksContext.jsx'

import { RegisterPage } from './pages/RegisterPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import TaskFormPage from './pages/TaskFormPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import HomePage from './pages/HomePage.jsx'

// Envuelve las rutas protegidas y es donde se hace la comprobacion de
// autenticacion de usuario para poder seguir si esta autenticado o redireccionar a /login si no esta autenticado.
import ProtectedRoute from './ProtectedRoute.jsx'

import Navbar from './components/Navbar.jsx'

export const App = () => {
  return (
    // Context para Auth (Autenticacion).
    <AuthProvider>

      {/* Context para Tasks. */}
      <TaskProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <Navbar />

            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />

              {/*
                si isAuthenticated === true, da paso a los componentes
                aqui dentro, sino redirecciona a /login
              */}
              <Route element={<ProtectedRoute />}>
                {/* Rutas protegidas por ProtectedRoute.jsx */}
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/add-task' element={<TaskFormPage />} />
                <Route path='/task/:id' element={<TaskFormPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}
