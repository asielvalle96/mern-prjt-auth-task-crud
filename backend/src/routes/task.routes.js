import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/tasks.controllers.js'

// Validate the task before create.
import { validateSchema } from '../middlewares/validator.middleware.js'

// It validates using the modulo zod the task from the Frontend form before create her.
import { createTaskSchema } from '../schemas/task.schema.js'

// Can the current user modify this task?
import { isItYourTask } from '../middlewares/isItYourTask.js'

const router = Router()

router.get('/tasks', authRequired, getTasks)
router.get('/task/:id', authRequired, isItYourTask, getTask)
router.post('/task', authRequired, validateSchema(createTaskSchema), createTask)
router.delete('/task/:id', authRequired, isItYourTask, deleteTask)
router.put('/task/:id', authRequired, isItYourTask, updateTask)

export default router
