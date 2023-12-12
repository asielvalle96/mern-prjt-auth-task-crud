import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string({
    required_error: 'Title is required.'
  }),

  // La description se espera que sea string.
  description: z.string({
    required_error: 'Description must be a string.'
  }),

  // La fecha se recibe como string, pero conviertemela a DateTime, y es opcional entrarla.
  date: z.string().datetime().optional()

  // title y description no es les puse optional, pero son required desde el task.model.js
})
