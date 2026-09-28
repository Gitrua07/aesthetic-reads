import axios from 'axios'

const api = axios.create()

const createUser = async(newUser) => {
    const { data } = await api.post('/api/users/', newUser)
    return data
}

const deleteUser = async(id) => {
    const { data } = await api.delete(`/api/users/${id}`)
    return data
}

const edit = async(biography, profile, userId) => {
    const { data: profileData } = await api.put(`/api/users/${userId}/profile`, {profilePicUrl: profile})
    const { data: bioData } = await api.put(`/api/users/${userId}/biography`, {biography})
    const results = [profileData, bioData]
    return results
}

export default {
    createUser,
    deleteUser,
    edit
}