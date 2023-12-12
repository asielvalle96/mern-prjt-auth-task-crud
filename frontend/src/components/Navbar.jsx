import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTasks } from '../context/TasksContext.jsx'

export default function Navbar () {
  const { isAuthenticated, user, logout } = useAuth()
  const { setTasks } = useTasks()

  return (
    <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg'>
      <Link to={
          isAuthenticated ? '/tasks' : '/'
        }
      >
        <h1 className='text-2xl font-bold'>Tasks Manager</h1>
      </Link>
      {
        isAuthenticated
          ? (
            <ul className='flex gap-x-2'>
              <li>
                Welcome {user.username}
              </li>
              <li>
                <Link to='/add-task' className='bg-sky-700 px-4 py-1 rounded-sm'>Add task</Link>
              </li>
              <li>
                <Link
                  to='/' onClick={async () => {
                    await setTasks([])
                    logout()
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
            )
          : (
            <ul className='flex gap-x-2'>
              <li>
                <Link to='/login' className='bg-sky-700 px-4 py-1 rounded-sm'>Login</Link>
              </li>
              <li>
                <Link to='/register' className='bg-sky-700 px-4 py-1 rounded-sm'>Register</Link>
              </li>
            </ul>
            )
      }
    </nav>
  )
}
