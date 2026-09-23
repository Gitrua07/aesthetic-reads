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
        const { name, password, email } = request.body
        const data = await User.create({
            username: name,
            email: email,
            password: password,
        })
    } catch (error) {
        console.error(error)
    }

})

app.post('/api/moodboards', async (request, response) => {
    const newObject = request.body
    const userId = 1 //temp
    const data = await MoodBoard.create({
        name: newObject.name,
        userid: userId
    })
    moodboards.push(newObject)
    response.status(201).json(newObject)
})

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

//PUT - Note must change structure, so that response
// contains all elements needed in books table
// app.put('/api/moodboards/:id', async (request, response) => {
//     const id = request.params.id
//     const data = await MoodBoard.findByPk(id)

//     if (!data) return response.status(404).json({ error: 'Data not found' })

//     //request.body should contain the book data
//     const bookData = request.body
//     const bookDataId = 0 //replace name w/ bookData.id
//     const bookTitle = 'fds'
//     const authors = []
//     const thumbnails = []

//     //look through books to see if bookData.id matches with any items
//     const isMatchBooks = await Book.findByPk(bookDataId)
//     //if NOT, then append bookData to books table and append to moodboard_books table too
//     if (!isMatchBooks) {
//         const booksTable = await Book.create({
//             title: bookTitle,
//             authors: authors,
//             thumbnails: thumbnails,
//         })

//         const moodboardsBooks = await MoodboardBook.create({
//             moodboardId: id,
//             userId: data.userid,
//         })
//     }

//     //if YES, then don't append bookData to books table, check moodboard_books
//     if (isMatchBooks) {
//         //to see if bookData.id AND moodboard.id matches with any items
//         const isMatchMoodboardBooks = await MoodboardBook.findByPk(bookDataId, id)
//         if (!isMatchMoodboardBooks) {
//             //if NO then append to board
//             const moodboardsBooks = await MoodboardBook.create({
//                 moodboardId: id,
//                 userId: data.userid,
//             })
//         }
//         //if YES then don't append
//     }
//     // await data.update(request.body)
//     const newMoodBoard = request.body
//     moodboards = moodboards.map(moodboard => moodboard.id === id ? newMoodBoard : moodboard)
//     response.status(200).json(moodboards)
// })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})