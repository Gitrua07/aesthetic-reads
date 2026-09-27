const express = require('express')
require('dotenv').config()
const { getAllMoodboards, getMoodboard, getMoodboardByUserId, deleteMoodboard, postMoodboard } = require('../controllers/moodboardController.js')
const { getAllMoodboardBooks, getMoodboardBook, deleteMoodboardBook, postMoodboardBook } = require('../controllers/moodboardBookController.js')
const { getAllBooks, getBook } = require('../controllers/BookController.js')
const { changeUserBio, changeUserImage } = require('../controllers/userController.js')

const moodboardRouter = express.Router()

//GET methods
moodboardRouter.get('/moodboards', getAllMoodboards)
moodboardRouter.get('/books', getAllBooks)
moodboardRouter.get('/moodboardBooks', getAllMoodboardBooks)
moodboardRouter.get('/moodboards/:id', getMoodboard)
moodboardRouter.get('/moodboardBooks/:moodboardId', getMoodboardBook)
moodboardRouter.get('/books/:bookId', getBook)
moodboardRouter.get('/moodboards/users/:userId', getMoodboardByUserId)

//DELETE methods
moodboardRouter.delete('/moodboards/:id', deleteMoodboard)
moodboardRouter.delete('/moodboardBooks/:moodboardId/books/:bookid', deleteMoodboardBook)

//POST methods
moodboardRouter.post('/moodboards', postMoodboard)
//There is a post error which doesn't affect the front-end overlay, check here for debugging
moodboardRouter.post('/moodboardBooks', postMoodboardBook)

//PUT methods
moodboardRouter.put('/users/:userid/biography', changeUserBio)
moodboardRouter.put('/users/:userid/profile', changeUserImage)

module.exports = moodboardRouter
