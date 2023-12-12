import mongoose from 'mongoose'

export const connectDB = async () => {
  const connectionURL = 'mongodb+srv://asielvallevalera:Dentro_NUBE_+_8@cluster0.h4hykce.mongodb.net/mern_crud_auth'
  try {
    await mongoose.connect(connectionURL)
    console.log('DB is connected.')
  } catch (error) {
    console.log(error)
  }
}
