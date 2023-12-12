import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    // Para consigue el user logueado actualmente.
    // Entonces createTask (en el controlador) puede guardar la tarea con su correspondiente user.
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true // Para establecer que obligado tiene que pasarme un user.
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('Task', taskSchema)
