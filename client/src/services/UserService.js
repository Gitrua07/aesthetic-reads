import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

const getAllUsers = async() => {
    const { data } = await api.get('/users')
    return data
}

const getUser = async(id) => {
    const { data } = await api.get(`/users/${id}`)
    return data
}

const createUser = async(newUser) => {
    const { data } = await api.post('/users/', newUser)
    return data
}

const deleteUser = async(id) => {
    const { data } = await api.delete(`/users/${id}`)
    return data
}

const edit = async(biography, profile, userId) => {
    const { data1 } = await api.put(`/api/users/${userId}/profile`, {profilePicUrl: profile})
    const { data2 } = await api.put(`/api/users/${userId}/biography`, {biography})
    const results = [data1, data2]
    return results
}

export default {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    edit
}