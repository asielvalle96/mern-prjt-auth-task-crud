// Custom Hook que trae a los elementos del Context.
import { useEffect } from 'react'
import { useTasks } from '../context/TasksContext.jsx'
import TaskCard from '../components/TaskCard.jsx'

export default function TasksPage () {
  const { tasks, getTasks } = useTasks()

  useEffect(() => {
    getTasks()
  }, [])

  if (tasks.length === 0) return (<h1>No hay tareas.</h1>)

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-2'>
      {
        tasks.map(task => (
          <TaskCard task={task} key={task._id} />
        ))
      }
    </div>
  )
}
