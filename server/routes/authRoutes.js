const express = require('express')
const postAuth = require('../controllers/authController.js')

const authRouter = express.Router()

//Verifies if user has provided the correct username and password
authRouter.post('/', postAuth)

module.exports = authRouter