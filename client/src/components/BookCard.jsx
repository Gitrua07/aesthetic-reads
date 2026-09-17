import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SubmitBoard from './SubmitBoard'
import MoodBoardServices from '../services/Moodboard'
import axios from 'axios'

const SubmitBoards = ({thumbnail, bookid, handleMoodBoard, selectedMoodBoard, setMoodBoard, moodBoardData, setMoodBoardData }) => {
    return (
        <div className='text-black flex p-2 gap-5 absolute bottom-0 opacity-0 group-hover:opacity-100' >
            <SubmitBoard
                classNameSelect='rounded-xl bg-white'
                thumbnail={thumbnail}
                bookid={bookid}
                handleMoodBoard={handleMoodBoard}
                selectedMoodBoard={selectedMoodBoard}
                setMoodBoard={setMoodBoard}
                moodBoardData={moodBoardData}
                setMoodBoardData={setMoodBoardData}
                classNameButton='rounded-xl bg-white p-1'
            />
        </div >
    )
}


const BookTitle = ({ title }) => <h3 className='text-black font-medium'>{title}</h3>

const getMoodBoardData = await MoodBoardServices.getMoodBoard()

export default function BookCard(props) {
    /**
     * This component returns a display
     * of the book which will be listed on the 
     * BookList components.
     */
    const [selectedMoodBoard, setMoodBoard] = useState(0)
    console.log(selectedMoodBoard)
    // useEffect(() => {
    //     if (!selectedMoodBoard && props.moodBoardData?.length){
    //         setMoodBoard(String(props.moodBoardData[0].id))
    //     }
    // }, [props.moodBoardData, selectedMoodBoard])

    useEffect(()=> props.setMoodBoardData(getMoodBoardData), [])

    const handleMoodBoard = (event) => {
        event.preventDefault()
        // // console.log("HERE")
        //  axios
        //     .post('http://localhost:3001/moodboards')

    }

    
    // async function handleMoodBoard(e) {
    //     // console.log("HERELL")
    //     e.preventDefault() //Prevents page refresh
    //     await fetch('/api/moodboard', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ mood: selectedMoodBoard, bookId: props.bookid })
    //     })
    // }

    return (
        <article className="w-40">
            <div className='relative group'>
                <Link to={props.link} >
                    <img className="rounded-xl w-80" src={props.src} alt="thumbnail showing this book"/>
                </Link>
                <SubmitBoards thumbnail={props.thumbnail} bookid={props.bookid} handleMoodBoard={handleMoodBoard} selectedMoodBoard={selectedMoodBoard} setMoodBoard={setMoodBoard} moodBoardData={props.moodBoardData} setMoodBoardData={props.setMoodBoardData} />
            </div>
            <BookTitle title={props.title} />
            <div className='text-sm italic'>{props.author}</div>
        </article>
    )
}
