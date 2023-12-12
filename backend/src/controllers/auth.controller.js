import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
  const { email, password, username } = req.body

  try {
    const userFound = await User.findOne({ email })
    if (userFound) {
      return res.status(400).json({ message: ['This email is already in use.'] })
    }

    const passwordHash = await bcrypt.hash(password, 10) // Encripta el password.

    const newUser = new User({
      username,
      email,
      password: passwordHash // Oye, toma el password encriptado.
    })
    const userSaved = await newUser.save() // guardar el user.
    const token = await createAccessToken({ id: userSaved._id }) // crear el token.

    res.cookie('token', token) // establece el token en una cookie en la respuesta.

    res.json({ // envia esta respuesta.
      message: 'User created successfully.',
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userFound = await User.findOne({ email })

    if (!userFound) {
      return res.status(400).json({
        message: ['The email does not exist.']
      })
    }

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).json({
        message: ['The password is incorrect.']
      })
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username
    })

    res.cookie('token', token)

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  res.cookie('token', '', {
    // httpOnly: true,
    // secure: true,
    expires: new Date(0) // fecha de expiración.
  })

  return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.status(400).json({ message: 'User not found.' })

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })
}

// Si el usuario trajo el token vamos a tratar de pasarlo por jwt.
// Esto se ejecuta cada vez que la pagina carga por primera vez, dijo.
export const verifyToken = async (req, res) => {
  const { token } = req.cookies

  if (!token) return res.status(401).json({ message: 'Unauthorized.' })

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: err })

    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(401).json({ message: 'User not found.' })

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}
