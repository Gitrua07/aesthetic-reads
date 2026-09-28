import axios from 'axios'

const api = axios.create()

const createUser = async(newUser) => {
    const { data } = await api.post('/api/users/', newUser)
    return data
}

const deleteUser = async() => {
    const { data } = await api.delete(`/api/users/me`)
    return data
}

const edit = async(biography, profile) => {
    const { data: profileData } = await api.put(`/api/users/me/profile`, {profilePicUrl: profile})
    const { data: bioData } = await api.put(`/api/users/me/biography`, {biography})
    const results = [profileData, bioData]
    return results
}

export default {
    createUser,
    deleteUser,
    edit
}