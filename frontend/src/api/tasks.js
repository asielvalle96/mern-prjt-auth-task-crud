// Trea unas configuraciones que le hice a axios en frontend/src/api/axios.js.
import axios from './axios.js'

// Viene la URL del Backend desde axios.js http://localhost:3000/api/

// get | http://localhost:3000/api/tasks
export const getTasksRequest = () => axios.get('/tasks')

// get | http://localhost:3000/api/task/:id
export const getTaskRequest = (id) => axios.get(`/task/${id}`)

// post | http://localhost:3000/api/task
export const createTaskRequest = (task) => axios.post('/task', task)

// delete | http://localhost:3000/api/task/:id
export const deleteTaskRequest = (id) => axios.delete(`/task/${id}`)

// put | http://localhost:3000/api/task/:id
export const updateTaskRequest = (id, task) => axios.put(`/task/${id}`, task)
