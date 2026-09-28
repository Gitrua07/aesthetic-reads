const express = require('express')
const { deleteUser, postUser } = require('../controllers/userController.js')
const userRouter = express.Router()
const requireAuth = require('../middleware/requireAuth.js')

//DELETE methods
userRouter.delete('/me', requireAuth, deleteUser)

//POST methods
userRouter.post('/', postUser)

module.exports = userRouter
