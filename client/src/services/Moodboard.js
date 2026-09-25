import axios from 'axios'

const getMoodBoard = async () => {
    const request = await axios.get('http://localhost:3001/api/moodboards').then(response => response.data)
    return request
}

const getMoodBoardById = async(id) => {
    console.log(`calling: http://localhost:3001/api/moodboards/${id}`)
    const request = await axios.get(`http://localhost:3001/api/moodboards/${id}`).then(response => response.data)
    return request
}

const getMoodBoardByUserId = async(userId) => {
    if (!userId) return null
    console.log(`calling: http://localhost:3001/api/moodboards/users/${userId}`)
    const request = await axios.get(`http://localhost:3001/api/moodboards/users/${userId}`).then(response => response.data)
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
    console.log(id)
    const request = await axios.delete(`http://localhost:3001/api/moodboards/${id}`).then(response => response.data)
    return request
}

const deleteBook = async(moodboardId, bookId) => {
    const request = await axios.delete(`/api/moodboardBooks/${moodboardId}/books/${bookId}`).then(response => response.data)
    return request
}

const createMoodBoard = async(newMoodBoard) => {
    console.log(newMoodBoard)
    const request = await axios.post(`http://localhost:3001/api/moodboards`, newMoodBoard).then(response => response.data)
    return request
}

//User section

const getAllUsers = async() => {
    const request = await axios.get('http://localhost:3001/users').then(response => response.data)
    return request
}

const getUser = async(id) => {
    const request = await axios.get(`http://localhost:3001/users/${id}`).then(response => response.data)
    return request
}

const createUser = async(newUser) => {
    console.log(newUser)
    const request = await axios.post('http://localhost:3001/users/', newUser).then(response => response.data)
    return request
}

const login = async(credentials) => {
    const request = await axios.post('http://localhost:3001/login', credentials).then(response => response.data)
    return request
}

export default {
    getMoodBoard,
    updateMoodBoard,
    deleteMoodBoard,
    createMoodBoard,
    addBookToMoodboard,
    getBookFromMoodboard,
    getBookById,
    getMoodBoardById,
    deleteBook,
    getAllUsers,
    getUser,
    createUser,
    login,
    getMoodBoardByUserId
}