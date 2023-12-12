import Task from '../models/task.model.js'

// Return all tasks associated to the current login user at the Frontend.
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id // Get only the tasks where your user is the current.
    }).populate('user') // Set all the user info.

    res.json(tasks)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Create a task.
export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body

    // Build the object that I'm going to save (create).
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id // Get the current login user to assign it to this task.
    })
    await newTask.save() // Save (create) this task.

    res.json(newTask) // Return the task created.
    console.log(newTask)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Delete a task using :id
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id)
    if (!deletedTask) return res.status(417).json([{ message: deletedTask }, 'Expectation Failed.'])

    // 204 = It is OK. No content to return.
    return res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Update a task.
export const updateTask = async (req, res) => {
  try {
    const { title, description, date } = req.body
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date },

      // When mongoose updates the task, mongoose returns
      // the old data; then I use this code to return the new data (current data)
      { new: true }
    )
    return res.json(taskUpdated)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Return the task using :id
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user') // Set all the user info.
    res.json(task)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
