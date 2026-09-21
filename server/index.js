require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

class User extends Model {}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    updatedAt: false,
    modelName: 'user'
})


class MoodBoard extends Model {}
MoodBoard.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'}
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    updatedAt: false,
    modelName: 'moodboard'
})

class Book extends Model {}
Book.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    authors: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
    },
    thumbnails: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'book'
})

class moodboardBook extends Model {}
moodboardBook.init({
    moodboard_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {model: 'moodboard', key: 'id'},
        onDelete: 'CASCADE'
    },
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {model: 'user', key: 'id'},
        onDelete: 'CASCADE'
    }
},
{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'moodboardBook'
})


let moodboards = []

let userinfos = [
    {
        id: 1,
        name: 'gaia'
    }
]

//GET routes
app.get('/api/moodboards', (request, response) => {
    const data = MoodBoard.findAll()
    response.json(data)
})

app.get('/userinfos', (request, response)=> {
    const data = User.findAll()
    response.json(data)
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
    moodboards = moodboards.filter(moodboard => String(moodboard.id) !== String(id))
    response.status(204).end()
})

app.delete('/userinfos/:id', (request, response) => {
    const id = request.params.id
    userinfos = userinfos.filter(userinfo => userinfo.id !== id)
    response.status(204).end()
})

//POST routes
app.post('/userinfos', (request, response) => {
    const {name, password, email} = response.body
    const id = 1
    const contents = request.body.contents
    const newObject = {
        id: id,
        name: name,
        password: password,
        email: email
    }
})

app.post('/api/moodboards', (request, response) => {
    const newObject = request.body
    moodboards.push(newObject)
    response.status(201).json(newObject)
})

//PUT
app.put('/api/moodboards/:id', (request, response) => {
    const id = request.params.id
    const newMoodBoard = request.body
    moodboards = moodboards.map(moodboard => moodboard.id === id ? newMoodBoard : moodboard )
    response.status(200).json(moodboards)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})