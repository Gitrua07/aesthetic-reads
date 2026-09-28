import axios from 'axios'

const api = axios.create()

const getMoodBoard = async () => {
    const { data } = await api.get('/api/moodboards')
    return data
}

const getMoodBoardById = async(id) => {
    if (!id) return []
    const { data } = await api.get(`/api/moodboards/${id}`)
    return data
}

const getMoodBoardByUserId = async() => {
    const { data } = await api.get(`/api/moodboards/users/me`)
    return data
}

const deleteMoodBoard = async(id) => {
    const { data } = await api.delete(`/api/moodboards/${id}`)
    return data
}

const createMoodBoard = async(newMoodBoard) => {
    const { data } = await api.post(`/api/moodboards`, newMoodBoard)
    return data
}

const login = async(credentials) => {
    const { data } = await api.post('/api/auth/login', credentials)
    return data
}

const logout = async() => {
    await api.post('/api/auth/logout')
}

const getMe = async() => {
   const { data } = await api.get('/api/auth/me')
   return data
}

export default {
    getMoodBoard,
    deleteMoodBoard,
    createMoodBoard,
    getMoodBoardById,
    login,
    getMoodBoardByUserId,
    logout,
    getMe
}