const bcrypt = require('bcrypt')
const { User } = require('../database.js')

const postAuth = async (request, response) => {
  try{
    const credentials = request.body
    const username = credentials.username
    const password = credentials.password

    if (!username || !password) return response.status(400).json({ error: 'username or password does not exist' })

    const userDatas = await User.scope('withPassword').findOne({
      where: { username: username }
    })

    const userData = userDatas

    if (!userData) return response.status(401).json({ error: 'Invalid username or password' })

    const verifyUser = await bcrypt.compare(password, userData.password)

    if (!verifyUser) return response.status(401).json({ error: 'Invalid username or password' })

    return response.status(200).json({ isVerified: verifyUser, id: userData.id, bio: userData.biography, profilePicUrl: userData.profilePicUrl })
  }catch(err){
    response.status(401).json({ error: err })
  }
}

module.exports = postAuth