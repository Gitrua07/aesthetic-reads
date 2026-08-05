import axios from 'axios'

const getMoodBoard = () => {
    const request = axios.get('http://localhost:3001/moodboards')
    return request.then(response => response.data)
}

const updateMoodBoard = moodObject => {
    const request = axios.post(`http://localhost:3001/moodboards/`, moodObject)
    return request.then(response => response.data)
}

const deleteMoodBoard = id => {
    const request = axios.delete(`http://localhost:3001/moodboards/${id}`)
    return request.then(response => response.data)
}

export default {
    getMoodBoard,
    updateMoodBoard,
    deleteMoodBoard
}