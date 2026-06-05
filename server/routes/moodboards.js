import express from 'express'
import { moodBoardGetController } from '../controllers/moodBoardGetController.js'
import { moodBoardPostController } from '../controllers/moodBoardPostController.js'
import { moodBoardDeleteController } from '../controllers/moodBoardDeleteController.js'
import { moodBoardBookDeleteController } from '../controllers/moodBoardBookDeleteController.js'

export const moodBoardRouter = express.Router()

//Initalizes GET endpoints 
// endpoint: moodboard, user-info
moodBoardRouter.get('/moodboards', moodBoardGetController)

//Initalize POST info
// endpoint: moodboard, user-info
moodBoardRouter.post('/moodboard', moodBoardPostController)

//Initalize DELETE info
// endpoint: moodboard, user-info, books
moodBoardRouter.delete('/moodboard', moodBoardDeleteController)
moodBoardRouter.delete('/moodboard/books', moodBoardBookDeleteController)

