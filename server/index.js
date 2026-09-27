require('dotenv').config()
const express = require('express')
const app = express()
const moodboardRouter = require('./routes/moodboardRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const authRouter = require('./routes/authRoutes.js')

const cors = require('cors')
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api', moodboardRouter)
app.use('/users', userRouter)
app.use('/login', authRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})