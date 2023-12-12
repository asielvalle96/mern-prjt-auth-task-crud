import { Router } from 'express'
import { register, login, logout, profile, verifyToken } from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
// Para validar register y login.
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'

const router = Router()

// Cada ruta que quiere proteger solo debo poner delante la funcion "authRequired". Asi como en la ruta de profile.
// Eso seria para verificar que exista un user logueado (token de autenticacion).
router.post('/api/register', validateSchema(registerSchema), register)
router.post('/api/login', validateSchema(loginSchema), login)
router.post('/api/logout', logout)
router.get('/api/verify-token', verifyToken)
router.get('/api/profile', authRequired, profile)

export default router
