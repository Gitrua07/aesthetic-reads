import axios from 'axios'

const getMoodBoard = async () => {
    const request = await axios.get('http://localhost:3001/api/moodboards').then(response => response.data)
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
    createMoodBoard
}