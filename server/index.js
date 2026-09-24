require('dotenv').config();
const bcrypt = require('bcrypt')
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

class User extends Model { }
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


class MoodBoard extends Model { }
MoodBoard.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
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

class Book extends Model { }
Book.init({
    id: {
        type: DataTypes.TEXT,
        primaryKey: true,
        allowNull: false
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

class MoodboardBook extends Model { }
MoodboardBook.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    moodboardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'moodboard', key: 'id' },
        onDelete: 'CASCADE'
    },
    bookId: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: { model: 'book', key: 'id' },
        onDelete: 'CASCADE'
    }
},
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'moodboardBook',
        indexes: [
            {
                unique: true,
                fields: ['book_id', 'moodboard_id']
            }
        ]
    })

//GET routes
app.get('/api/moodboards', async (request, response) => {
    try {
        const data = await MoodBoard.findAll()
        response.json(data)
        console.log(data)
    } catch (error) {
        response.status(400).json({ error })
        // console.log("Error has occurred: ", error)
    }
})

app.get('/users', async (request, response) => {
    const data = await User.findAll()
    response.json(data)
})

app.get('/api/books', async(request, response) => {
    const data = await Book.findAll()
    response.json(data)
})

app.get('/api/moodboardBooks', async(request, response) => {
    const data = await MoodboardBook.findAll()
    response.json(data)
})

app.get('/api/moodboards/:id', async (request, response) => {
    const id = Number(request.params.id)
    const data = await MoodBoard.findByPk(id)
    response.json(data)
})

app.get('/users/:id', async (request, response) => {
    const id = request.params.id
    const data = await User.findByPk(id)
    response.json(data)
})

app.get('/api/moodboardBooks/:moodboardId', async(request, response) => {
    const data = await MoodboardBook.findAll({
        where: {moodboardId: request.params.moodboardId}
    })
    response.json(data)
})

app.get('/api/books/:bookId', async(request, response) => {
    const data = await Book.findByPk(request.params.bookId)
    response.json(data)
})

app.get(`/api/moodboards/users/:userId`, async(request, response) => {
    const data = await MoodBoard.findAll({
        where: {userid: request.params.userId}
    })
    // response.json(data)
    console.log(data)
    response.json(data)
})  
//DELETE routes
app.delete('/api/moodboards/:id', async (request, response) => {
    const id = request.params.id
    const data = await MoodBoard.destroy({
        where: { id: id },
    })
    response.status(204).end()
})

app.delete('/users/:id', async (request, response) => {
    const id = request.params.id
    const data = await User.destroy({
        where: { id: id },
    })
    response.status(204).end()
})

app.delete('/api/moodboardBooks/:moodboardId/books/:bookid', async(request, response) => {
    const moodboardId = request.params.moodboardId
    const bookId = request.params.bookid
    const data = await MoodboardBook.destroy({
        where: {moodboardId: moodboardId, bookId: bookId}
    })
    response.status(204).end()
})

//POST routes
app.post('/users', async (request, response) => {
    try {
        // const { name, password, email } = request.body
        const userInfo = request.body
        const name = userInfo.username
        const email = userInfo.email
        const password = userInfo.password
        console.log(name, password, email)
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const data = await User.create({
            username: name,
            email: email,
            password: passwordHash,
        })
        return response.status(201).json(data)
    } catch (err) {
        console.log(request.body)
        console.error(err)
        return response.status(500).json({error: 'could not create user'})

    }

})

app.post('/api/moodboards', async (request, response) => {
    const newObject = request.body

    // const userId = 1 //temp
    const data = await MoodBoard.create({
        name: newObject.name,
        userid: newObject.id
    })
    moodboards.push(newObject)
    response.status(201).json(newObject)
})

//There is a post error which doesn't affect the front-end overlay, check here for debugging
app.post('/api/moodboardBooks', async (request, response) => {
    try {
        //body = bookId, moodboardId, title, authors, thumbnails
        const data = request.body
        const bookId = data.bookId
        const moodboardId = data.moodboardId

        if (!moodboardId || !bookId) return response.status(400).json({error: 'bookId or moodboardId is missing'})

        await Book.findOrCreate({
            where: { id: bookId }, defaults: { title: data.title, authors: data.authors, thumbnails: data.thumbnails }
        })

        const [results, created] = await MoodboardBook.findOrCreate({
            where: {
                moodboardId: moodboardId,
                bookId: bookId
            }
        })

        response.status(200).json(results)

    } catch (error) {
        console.error(error)
        response.status(500).json({ error: 'Failed to add book to Moodboard' })
    }
})

app.post('/login', async(request, response) => {
    const credentials = request.body
    const username = credentials.username
    const password = credentials.password

    const userDatas = await User.findAll({
        where: {username:username}
    })

    const userData = userDatas[0]

    if (!userData) return response.status(401).json({error: 'Failed to find a user'})
    
    const verifyUser = await bcrypt.compare(password, userData.password)    

    if(!verifyUser) return response.status(401).json({error: 'Wrong password'})

    return response.status(200).json({isVerified: verifyUser, id: userData.id})
})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})