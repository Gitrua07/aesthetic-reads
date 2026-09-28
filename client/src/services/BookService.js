import axios from 'axios'

const api = axios.create()

const getBookFromMoodboard = async(moodboardId) => {
    const { data } = await api.get(`/api/moodboardBooks/${moodboardId}`)
    return data
}

const getBookById = async(bookId) => {
    const { data } = await api.get(`/api/books/${bookId}`)
    return data
}

const addBookToMoodboard = async (data0) => {
    const { data } = await api.post('/api/moodboardBooks', data0)
    return data
}

const deleteBook = async(moodboardId, bookId) => {
    const { data } = await api.delete(`/api/moodboardBooks/${moodboardId}/books/${bookId}`)
    return data
}

export default {
    addBookToMoodboard,
    getBookFromMoodboard,
    getBookById,
    deleteBook
}