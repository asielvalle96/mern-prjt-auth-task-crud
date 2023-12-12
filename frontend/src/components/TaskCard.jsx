import { useTasks } from '../context/TasksContext.jsx'
import { Link } from 'react-router-dom'
// Formatear fecha
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc' // Formato UTC que usa MongoDB.
dayjs.extend(utc)

export default function TaskCard ({ task }) {
  const { deleteTask } = useTasks()

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>{task.title}</h1>
        <div className='flex gap-x-2 items-center'>
          <button
            onClick={() => deleteTask(task._id)}
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
          >
            Delete
          </button>

          <Link to={`/task/${task._id}`} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>
            Edit
          </Link>
        </div>
      </header>
      <p className='text-slate-300'>{task.description}</p>
      {/* <p className='text-slate-300'>{new Date(task.date).toLocaleDateString()}</p> */}
      <p className='text-slate-300'>{dayjs.utc(task.date).format('MM/DD/YYYY')}</p>
    </div>
  )
}
