import Task from '../models/task.model.js'

export const isItYourTask = async (req, res, next) => {
  // req.params.id = :id en la ruta.
  // populate('user') = show toda la info del user on Task, in this case.
  const task = await Task.findById(req.params.id)

  // return statusCode 404 and message
  if (!task) return res.status(404).json({ message: 'Task not found.' })

  // return statusCode 203 and message
  // req.user comes from the middleware previous (authRequired).
  if (JSON.stringify(req.user.id) !== JSON.stringify(task.user._id)) return res.status(203).json({ message: 'The action was unsuccessful. This task is not yours.' })

  // Go ahead the next on this route.
  next()
}
