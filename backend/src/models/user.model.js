import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true // '  asiel' ==> 'asiel'
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true // Establezco que cada email es unico. No se podra entrar un email que ya existe en la DB.
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Para poder conseguir fechas en que se creo y la ultima modificacion de cada objeto User.
})

export default mongoose.model('User', userSchema)
