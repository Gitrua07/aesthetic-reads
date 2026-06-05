import express from 'express'
import {moodBoardRouter} from './routes/moodboards.js'
import {userInfoRouter} from './routes/userInfos.js'
import cors from 'cors'

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))

app.use(express.json())

app.use('/api', moodBoardRouter)
app.use('/api', userInfoRouter)

app.listen(PORT, () => console.log(`connected to port ${PORT}`))