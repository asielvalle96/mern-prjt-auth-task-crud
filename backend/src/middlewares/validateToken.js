// Generator of the token.
import jwt from 'jsonwebtoken'

// My private key to create the token.
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'No token. You are not authenticated.' })

  // Un-sign of the token.
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token.' })

    // console.log(user)
    // {
    //   id: '65689ed94d8014ef4db57ed4',
    //   username: 'person',
    //   iat: 1701478703,
    //   exp: 1701565103
    // }

    // I can use "req.user" to get the user info ahead on the route.
    req.user = user

    // Go ahead the next on this route.
    next()
  })
}
