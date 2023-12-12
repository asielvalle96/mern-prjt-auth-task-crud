import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
// Formatear fecha
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc' // Formato UTC que usa MongoDB.
dayjs.extend(utc)

export default function TaskFormPage () {
  const { register, handleSubmit, setValue } = useForm()
  const { createTask, getTask, updateTask } = useTasks()
  const navigate = useNavigate()
  const params = useParams() // Detecta si la URL tiene /:id

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id)
        // console.log(task)
        // Desde la DB consigo el objeto task a editar.
        setValue('title', task.title)
        setValue('description', task.description)
        setValue('date', dayjs.utc(task.date).format('YYYY-MM-DD')) // Formato YYYY-MM-DD que entiende el input type date.
        // Asi quedan llenos los campos title, description y fecha para editarlos.
      }
    }

    loadTask()
  }, [])

  const onSubmit = handleSubmit(async (data) => {
    // Recibirá el objeto { title: x, descriptio: y, date: z }.
    // Este se enviará al Backend a traves de las funciones updateTask y createTask, segun corresponda.
    const dataToSendToBackend = {
      ...data,
      // Si se seleccionó la fecha mándala formateada, sino manda vacio.
      date: data.date
        ? dayjs.utc(data.date).format() // Fecha desde input en el formulario la formateo a UTC para MongoDB.
        : dayjs.utc().format()
      // Al no mandar fecha alguna se guardará la tarea con fecha actual, porque
      // en el modelo date tiene por default la fecha actual.
    }

    if (params.id) {
      await updateTask(params.id, dataToSendToBackend)
    } else {
      await createTask(dataToSendToBackend)
    }

    navigate('/tasks')
  })

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          autoFocus
          type='text'
          placeholder='Title'
          {...register('title')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <label htmlFor='description'>Description</label>
        <textarea
          placeholder='Description'
          rows='10'
          {...register('description')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        />
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          {...register('date')}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          format='MM/DD/YYYY'
        />
        <button className='bg-sky-500 px-3 py-2 rounded-md'>Save</button>
      </form>
    </div>
  )
}
