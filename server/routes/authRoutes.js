const express = require('express')
const postAuth = require('../controllers/authController.js')
const { COOKIE_OPTIONS } = require('../utils/authCookie.js')
const { User } = require('../database.js')
const requireAuth = require('../middleware/requireAuth.js')
const authRouter = express.Router()

const toPublicUser = (user) => ({
  id: user.id,
  username: user.username,
  biography: user.biography,
  avatar: user.profilePicUrl,
})

authRouter.get('/me', requireAuth, async(request, response) => {
  const user = await User.findByPk(request.user.id)
  if (!user) {
    response.clearCookie('token', COOKIE_OPTIONS)
    return response.status(401).json({ error: 'Not logged in' })
  }
  return response.json(toPublicUser(user))
})

authRouter.post('/login', postAuth)

authRouter.post('/logout', async(request, response) => {
  response.clearCookie('token', COOKIE_OPTIONS)
  response.status(204).end()
})

module.exports = authRouter