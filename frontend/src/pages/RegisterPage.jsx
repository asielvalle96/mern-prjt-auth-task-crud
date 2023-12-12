// Libreria que maneja en cambio de estado y la validacion de formularios.
import { useForm } from 'react-hook-form'
// Custom Hook que trae a los elementos del Context.
import { useAuth } from '../context/AuthContext.jsx'
// Hook de la Rutas de React.
import { useNavigate, Link } from 'react-router-dom'

import { useEffect } from 'react'

export const RegisterPage = () => {
  const { signup, isAuthenticated, errors: signupErrors } = useAuth() // Context.
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (values) => {
    await signup(values)
  })

  // Siempre que isAuthenticated === true redirecciona a /tasks.
  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
        <h1>Register</h1>
        <form onSubmit={onSubmit}>
          {/* Using register property from useForm Hook */}
          {/* username es el name del input y le paso la propiedad campo requierd, otras porpiedades. */}
          <input
            type='text'
            {...register('username', { required: true })}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='username'
          />
          {errors.username && (
            <p className='text-red-500'>Username is required</p>
          )}

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

          <button type='submit' className='my-5 bg-sky-500 text-white px-4 py-2 rounded-md'>Register</button>
          {
            signupErrors.map((error, i) => (
              <div className='bg-red-500 p-2 text-white' key={i}>
                {error}
              </div>
            ))
          }
        </form>
        <p className='flex gap-x-2 justify-between'>
          Already have an account? <Link to='/login' className='text-sky-500'>Login</Link>
        </p>
      </div>
    </div>
  )
}
