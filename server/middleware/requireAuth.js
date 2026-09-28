const jwt = require('jsonwebtoken')

const requireAuth = (request, response, next) => {
  //read request.cookies.token
  const token = request.cookies.token
  if (!token) return response.status(401).json({ error: 'Missing token' })
  //call jwt.verify(token, process.env.JWT_SECRET)
  let payload
  try{
    payload = jwt.verify(token, process.env.JWT_SECRET)
    request.user = { id: payload.id }
    next()
  }catch{
    response.status(401).json({ error: 'token is expired or tampered ' })
  }
}

module.exports = requireAuth
