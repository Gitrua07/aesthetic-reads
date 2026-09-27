const express = require('express')
const { getAllUsers, getUser, deleteUser, postUser } = require('../controllers/userController.js')
const userRouter = express.Router()

//GET methods
userRouter.get('/', getAllUsers)
userRouter.get('/:id', getUser)

//DELETE methods
userRouter.delete('/:id', deleteUser)

//POST methods
userRouter.post('/', postUser)

module.exports = userRouter
