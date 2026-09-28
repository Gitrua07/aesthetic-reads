const jwt = require('jsonwebtoken')

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

const setAuthCookie = (response, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
  response.cookie('token', token, COOKIE_OPTIONS)
}

module.exports = { setAuthCookie, COOKIE_OPTIONS }