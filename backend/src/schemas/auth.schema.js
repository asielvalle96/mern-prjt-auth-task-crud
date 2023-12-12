import { z } from 'zod' // z va a permitirnos entrar tipos de datos.

// Validar el register
export const registerSchema = z.object({
  // Valido que sea un string.
  username: z.string({
    required_error: 'Username is required.' // Lanza esto si no recibe nada.
  }), // Puedo ponerle una cantiad min y max de caracteres (con "." despues del ")").

  email: z.string({
    required_error: 'Email is required.'
  }).email({
    message: 'Email is not valid.'
  }),

  password: z.string({
    required_error: 'Password is required.'
  }).min(1, {
    message: 'Password must be at least 1 characters.'
  })
})

// Validar login
export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }).email({ message: 'Email is not valid.' }),
  password: z.string({ required_error: 'Password is required.' }).min(1, { message: 'Password must be at least 1 characters.' })
})
