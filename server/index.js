const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.json())

let moodboards = []

let userinfos = [
    {
        id: 1,
        name: 'gaia'
    }
]

//GET routes
app.get('/api/moodboards', (request, response) => {
    response.json(moodboards)
})

app.get('/userinfos', (request, response)=> {
    response.json(userinfos)
})

app.get('/api/moodboards/:id', (request, response) => {
    const id = request.params.id
    const moodboard = moodboards.find(moodboard => moodboard.id === id)
    response.json(moodboard)
})

app.get('/userinfos/:id', (request, response) => {
    const id = request.params.id
    const userinfo = userinfos.find(userinfo => userinfo.id === id)
    response.json(userinfo)
})

//DELETE routes
app.delete('/api/moodboards/:id', (request, response) => {
    const id = request.params.id
    moodboards = moodboards.filter(moodboard => moodboard.id !== id)
    response.status(204).end()
})

app.delete('/userinfos/:id', (request, response) => {
    const id = request.params.id
    userinfos = userinfos.filter(userinfo => userinfo.id !== id)
    response.status(204).end()
})

//POST routes
app.post('/userinfos', (request, response) => {
    const id = 1
    const contents = request.body.contents
    const newObject = {
        id: id,
        name: '',
        password: '',
        email: ''
    }
})

app.post('/api/moodboards', (request, response) => {
    const {title} = request.body
    const newObject = {
        id: 0,
        title: title
    }
    moodboards.push(newObject)
    response.status(201).json(newObject)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})