import { createContext, useContext, useState } from 'react'
import { createTaskRequest, deleteTaskRequest, getTasksRequest, getTaskRequest, updateTaskRequest } from '../api/tasks.js'

const TaskContext = createContext()

// Para llamar este Context.
// Para usar las variables y funciones que exporta globalmente este contexto solo debo llamar este Custom Hook.
export const useTasks = () => {
  const context = useContext(TaskContext)

  // Debes envolver con TaskProvider los componentes que accederan a las variable y funciones globales.
  if (!context) throw new Error('useTasks must be used within a TaskProvider.')

  return context
}

export function TaskProvider ({ children }) {
  const [tasks, setTasks] = useState([])

  const createTask = async (task) => {
    console.log('task', task)
    const res = await createTaskRequest(task)
    console.log(res)
  }

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id)
      console.log(res)
      if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))
      // Al eliminar me quedo en /tasks y la pagina no recarga; por
      // eso necesito actualizar el useState tasks (setTasks).
    } catch (error) {
      console.log(error)
    }
  }

  const getTasks = async () => {
    try {
      const res = await getTasksRequest()
      setTasks(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      // console.log(res)
      // console.log(res.data)
      return res.data
    } catch (error) {
      console.error(error)
    }
  }

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task)
      // Al editar salgo de la pagina /task/:id y cargo /tasks; por
      // eso no necesito actualizar el useState tasks.
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
        setTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
