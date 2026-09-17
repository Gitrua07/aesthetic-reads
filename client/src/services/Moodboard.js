import axios from 'axios'

const getMoodBoard = async () => {
    const request = await axios.get('http://localhost:3001/api/moodboards').then(response => response.data)
    return request
}

const updateMoodBoard = async (id, newMoodBoard) => {
    console.log(newMoodBoard)
    const request = await axios.put(`http://localhost:3001/api/moodboards/${id}`, newMoodBoard).then(response => response.data)
    return request
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