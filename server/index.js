require('dotenv').config()
const express = require('express')
const app = express()
const moodboardRouter = require('./routes/moodboardRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const authRouter = require('./routes/authRoutes.js')
const path = require('path')
const distPath = path.join(__dirname, '../client/dist')

// const cors = require('cors')
// app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api', moodboardRouter)
app.use('/api/users', userRouter)
app.use('/api/login', authRouter)

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.use(express.static(distPath))
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})