const { MoodboardBook, Book } = require('../database.js')

const getAllMoodboardBooks = async (request, response) => {
  try{
    const data = await MoodboardBook.findAll()
    response.json(data)
  }catch(err){
    response.status(401).json({ error: err })
  }
}

const getMoodboardBook = async (request, response) => {
  try{
    const data = await MoodboardBook.findAll({
      where: { moodboardId: request.params.moodboardId }
    })
    response.json(data)
  }catch(err){
    response.status(401).json({ error: err })
  }
}

const deleteMoodboardBook = async (request, response) => {
  try{
    const moodboardId = request.params.moodboardId
    const bookId = request.params.bookid
    await MoodboardBook.destroy({
      where: { moodboardId: moodboardId, bookId: bookId }
    })
    response.status(204).end()
  }catch(err){
    response.status(401).json({ error: err })
  }
}

const postMoodboardBook = async (request, response) => {
  try {
    const data = request.body
    const bookId = data.bookId
    const moodboardId = data.moodboardId

    if (!moodboardId || !bookId) return response.status(400).json({ error: 'bookId or moodboardId is missing' })

    await Book.findOrCreate({
      where: { id: bookId }, defaults: { title: data.title, authors: data.authors, thumbnails: data.thumbnails }
    })

    const [results] = await MoodboardBook.findOrCreate({
      where: {
        moodboardId: moodboardId,
        bookId: bookId
      }
    })

    response.status(200).json(results)

  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Failed to add book to Moodboard' })
  }
}

module.exports = {
  getAllMoodboardBooks,
  getMoodboardBook,
  deleteMoodboardBook,
  postMoodboardBook
}