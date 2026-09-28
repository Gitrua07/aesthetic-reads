const { User } = require('../database.js')
const bcrypt = require('bcrypt')
const { setAuthCookie } = require('../utils/authCookie.js')
const deleteUser = async (request, response) => {
  try{
    const id = request.params.id
    await User.destroy({
      where: { id: id },
    })
    response.status(204).end()
  }catch(err){
    response.status(401).json({ error: err })
  }
}

const postUser = async (request, response) => {
  try {
    const userInfo = request.body
    const name = userInfo.username
    const email = userInfo.email
    const password = userInfo.password

    if (!name || !email || !password) return response.status(400).json({ error: 'username, email, or password does not exist' })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const data = await User.create({
      username: name,
      email: email,
      password: passwordHash,
    })
    setAuthCookie(response, data.id)

    const { password: _, ...safeUser } = data.toJSON()
    return response.status(201).json(safeUser)
  } catch (err) {
    if (err.name==='SequelizeUniqueConstraintError') return response.status(409).json({ error: 'username or email is taken' })
    return response.status(500).json({ error: 'could not create user', err })

  }
}

const changeUserBio = async (request, response) => {
  try {
    const userId = request.user.id
    const biography = request.body.biography

    if (!userId) return response.status(400).json({ error: 'user does not exist' })

    const user = await User.findByPk(userId)

    if (!user) return response.status(404).json({ error: 'User cannot be found' })

    await user.update({ biography: biography })
    response.json(biography)
  } catch (err) {
    response.status(401).json({ error: err })
  }
}

const changeUserImage = async (request, response) => {
  try{
    const userId = request.user.id
    const profile = request.body.profilePicUrl

    if(!userId) return response.status(400).json({ error: 'User cannot be found' })

    const user = await User.findByPk(userId)

    if (!user) return response.status(404).json({ error: 'User cannot be found' })

    await user.update({ profilePicUrl: profile })
    response.json(profile)
  }catch(err){
    response.status(401).json({ error: err })
  }
}

module.exports = { deleteUser, postUser, changeUserBio, changeUserImage }