import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SubmitBoard from './SubmitBoard'
import MoodBoardServices from '../services/Moodboard'
import axios from 'axios'

const SubmitBoards = ({ handleMoodBoard, selectedMoodBoard, setMoodBoard, moodBoardData }) => {
    return (
        <div className='text-black flex p-2 gap-5 absolute bottom-0 opacity-0 group-hover:opacity-100' >
            <SubmitBoard
                classNameSelect='rounded-xl bg-white'
                handleMoodBoard={handleMoodBoard}
                selectedMoodBoard={selectedMoodBoard}
                setMoodBoard={setMoodBoard}
                moodBoardData={moodBoardData}
                classNameButton='rounded-xl bg-white p-1'
            />
        </div >
    )
}


const BookTitle = ({ title }) => <div className='text-black font-medium'>{title}</div>

export default function BookCard(props) {
    /**
     * This component returns a display
     * of the book which will be listed on the 
     * BookList components.
     */

    const [moodBoardData, setMoodBoardData] = useState([])
    const [selectedMoodBoard, setMoodBoard] = useState(moodBoardData[0] ?? '')
    const [val, setVal] = useState('')

    const getMoodBoardData = () => MoodBoardServices
        .getMoodBoard()
        .then(response => response.forEach(val => {
            const title = val.title
            console.log(title)
            setMoodBoardData(moodBoardData.concat(title))
        }
        ))
    // .then(response => {
    //     console.log(response)
    //     // const moodboards = response.data

    //     // moodboards.map(moodboard =>  {
    //     //     console.log(moodboard.name)
    //     //     setMoodBoardData(moodBoardData.concat(moodboard.name))
    //     // })
    // })
    useEffect(()=> getMoodBoardData, [])
    console.log(moodBoardData)

    // const handleMoodBoard = (event) => {
    //     event.preventDefault()
    //     console.log("HERE")
    //      axios
    //         .post('http://localhost:3001/moodboards')
    //         .then(
    //             response => console.log(response)
    //         )
    // }
    async function handleMoodBoard(e) {
        // console.log("HERELL")
        e.preventDefault() //Prevents page refresh
        await fetch('/api/moodboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mood: selectedMoodBoard, bookId: props.bookid })
        })
    }

    return (
        <article className="w-40">
            <div className='relative group'>
                <Link to={props.link} >
                    <img className="rounded-xl w-80" src={props.src} />
                </Link>
                <SubmitBoards handleMoodBoard={handleMoodBoard} selectedMoodBoard={selectedMoodBoard} setMoodBoard={setMoodBoard} moodBoardData={moodBoardData} />
            </div>
            <BookTitle title={props.title} />
        </article>
    )
}
