require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')

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
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  biography: {
    type: DataTypes.TEXT
  },
  profilePicUrl: {
    type: DataTypes.TEXT
  }

}, {
  sequelize,
  underscored: true,
  timestamps: true,
  updatedAt: false,
  defaultScope: { attributes: { exclude: ['password'] } },
  scopes: { withPassword: { attributes: {} } },
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
    references: { model: 'moodboards', key: 'id' },
    onDelete: 'CASCADE'
  },
  bookId: {
    type: DataTypes.TEXT,
    allowNull: false,
    references: { model: 'books', key: 'id' },
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

module.exports = { sequelize, User, MoodBoard, Book, MoodboardBook }