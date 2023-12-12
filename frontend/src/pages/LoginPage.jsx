// Libreria que maneja en cambio de estado y la validacion de formularios.
import { useForm } from 'react-hook-form'
// Custom Hook que trae a los elementos del Context.
import { useAuth } from '../context/AuthContext.jsx'

import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, errors: signinErrors, isAuthenticated } = useAuth() // Context.
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    await signin(data)
  })

  // Siempre que isAuthenticated === true redirecciona a /tasks.
  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h1>Login</h1>
        <form onSubmit={onSubmit}>
          {/* Using register property from useForm Hook */}
          {/* email es el name del input y le paso la propiedad campo requierd, otras porpiedades. */}

          <input
            type='email'
            {...register('email', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='email'
          />
          {errors.email && (
            <p className='text-red-500'>Email is required</p>
          )}

          <input
            type='password'
            {...register('password', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='password'
          />
          {errors.password && (
            <p className='text-red-500'>Password is required</p>
          )}

          <button type='submit' className='my-5 bg-sky-500 text-white px-4 py-2 rounded-md'>Login</button>
          {
          signinErrors.map((error, i) => (
            <div className='bg-red-500 p-2 text-white rounded-md mb-2' key={i}>
              {error}
            </div>
          ))
        }
        </form>
        <p className='flex gap-x-2 justify-between'>
          Don't have an account? <Link to='/register' className='text-sky-500'>Register</Link>
        </p>
      </div>
    </div>
  )
}
