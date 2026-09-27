const { Book } = require('../database.js')

const getAllBooks = async (request, response) => {
  try{
    const data = await Book.findAll()
    response.json(data)
  }catch(err){
    response.status(401).json({ error: err })
  }
}

const getBook = async (request, response) => {
  try{
    const data = await Book.findByPk(request.params.bookId)
    response.json(data)
  }catch(err){
    response.status(401).json({ error: err })
  }
}

module.exports = {
  getAllBooks,
  getBook
}