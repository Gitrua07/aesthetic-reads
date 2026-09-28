const { MoodBoard } = require('../database.js')

const getAllMoodboards = async (request, response) => {
  try {
    const data = await MoodBoard.findAll()
    response.json(data)
    console.log(data)
  } catch (error) {
    response.status(400).json({ error })
  }
}

const getMoodboard = async (request, response) => {
  try {
    const id = Number(request.params.id)
    const data = await MoodBoard.findByPk(id)
    response.json(data)
  } catch (err) {
    response.status(401).json({ error: err })
  }
}

const getMoodboardByUserId = async (request, response) => {
  try {
    const data = await MoodBoard.findAll({
      where: { userid: request.user.id }
    })
    response.json(data)
  } catch (err) {
    response.status(401).json({ error: 'User does not exist' , err })
  }
}

const deleteMoodboard = async (request, response) => {
  try {
    const id = request.params.id
    console.log('id --> ', id)
    await MoodBoard.destroy({
      where: { id: id },
    })
    response.status(204).end()
  } catch (err) {
    response.status(401).json({ error: err })
  }
}

const postMoodboard = async (request, response) => {
  try{
    const newObject = request.body

    if (!newObject) return response.status(400).json({ error: 'Moodboard does not exist' })

    const data = await MoodBoard.create({
      name: newObject.name,
      userid: newObject.id
    })
    response.status(201).json(data)
  }catch(err){
    response.status(401).json({ error: err })
  }
}

module.exports = { getAllMoodboards, getMoodboard, getMoodboardByUserId, deleteMoodboard, postMoodboard }