const express = require('express')
const { deleteUser, postUser } = require('../controllers/userController.js')
const userRouter = express.Router()

//DELETE methods
userRouter.delete('/me', deleteUser)

//POST methods
userRouter.post('/', postUser)

module.exports = userRouter
