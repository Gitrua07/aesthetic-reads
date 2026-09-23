import axios from 'axios'

const getMoodBoard = async () => {
    const request = await axios.get('http://localhost:3001/api/moodboards').then(response => response.data)
    return request
}

const getBookFromMoodboard = async(moodboardId) => {
    const request = await axios.get(`http://localhost:3001/api/moodboardBooks/${moodboardId}`).then(response => response.data)
    return request
}

const getBookById = async(bookId) => {
    const request = await axios.get(`/api/books/${bookId}`).then(response => response.data)
    return request
}

const updateMoodBoard = async (id, newMoodBoard) => {
    console.log("5. Update this board --> ")
    console.log(newMoodBoard)
    const request = await axios.put(`http://localhost:3001/api/moodboards/${id}`, newMoodBoard).then(response => response.data)
    console.log("Return the request to client --> ")
    console.log(request)
    return request
}

const addBookToMoodboard = async (data) => {
    //data = bookId, moodboardId, title, authors, thumbnails
    const request = await axios.post('http://localhost:3001/api/moodboardBooks', data).then(response => response.data)
    return request
}

const deleteMoodBoard = async(id) => {
    const request = await axios.delete(`http://localhost:3001/api/moodboards/${id}`).then(response => response.data)
    return request
}

const createMoodBoard = async(id, newMoodBoard) => {
    const request = await axios.post(`http://localhost:3001/api/moodboards`, newMoodBoard).then(response => response.data)
    return request
}

export default {
    getMoodBoard,
    updateMoodBoard,
    deleteMoodBoard,
    createMoodBoard,
    addBookToMoodboard,
    getBookFromMoodboard,
    getBookById
}