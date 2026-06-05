import express from 'express'
import {userInfoGetController} from '../controllers/userInfoGetController.js'
import {userInfoPostController} from '../controllers/userInfoPostController.js'
import {userInfoDeleteController} from '../controllers/userInfoDeleteController.js'

export const userInfoRouter = express.Router()

//Initalizes GET endpoints 
// endpoint: moodboard, user-info
userInfoRouter.get('/userInfo', userInfoGetController)

//Initalize POST info
// endpoint: moodboard, user-info
userInfoRouter.post('/userInfo', userInfoPostController)

//Initalize DELETE info
// endpoint: moodboard, user-info, books
userInfoRouter.post('/userInfo', userInfoDeleteController)

// book id --> moodboard id