import axios from 'axios'

const api = axios.create()

const getMoodBoard = async () => {
    const { data } = await api.get('/api/moodboards')
    return data
}

const getMoodBoardById = async(id) => {
    const { data } = await api.get(`/api/moodboards/${id}`)
    return data
}

const getMoodBoardByUserId = async(userId) => {
    if (!userId) return []
    const { data } = await api.get(`/api/moodboards/users/${userId}`)
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
    const { data } = await api.post('/api/login', credentials)
    return data
}

export default {
    getMoodBoard,
    deleteMoodBoard,
    createMoodBoard,
    getMoodBoardById,
    login,
    getMoodBoardByUserId
}