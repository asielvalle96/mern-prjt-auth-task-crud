import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import taskRoutes from './routes/task.routes.js'
// Resuleve la diferencia de dominios del Frontend (http://localhost:5173) y este, el Backend (http://localhost:3000/api/register).
import cors from 'cors'

const app = express()

// app.use(cors()) // Con esto, cualquier dominio que contenga al Frontend podrá comunicarse con este Backend.
app.use(cors(
  // This solves the CORS error.
  {
    origin: 'http://localhost:5173', // Solo este dominio para el Frontend (http://localhost:5173) podrá comunicarse con este Backend.
    credentials: true // Para que el Backend pueda establecer las cookies.
  }
))

app.use(morgan('dev'))
app.use(express.json()) // Para que Express entienda los request body en fromato json (ahora no imprime undefined en consola).
app.use(cookieParser()) // Ahora express puede leer las cookies (se veran en forma de objeto).
app.use(authRoutes)
app.use('/api', taskRoutes) // Aqui inician las rutas del CRUD para las tasks.

export default app
