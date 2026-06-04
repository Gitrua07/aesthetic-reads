import { Link } from 'react-router-dom'
import { useState } from 'react'
import SubmitBoard from './SubmitBoard'

const SubmitBoards = ({ handleMoodBoard, selectedMoodBoard, setMoodBoard, moodBoardData }) =>
    <div className='text-black flex p-2 gap-5 absolute bottom-0 opacity-0 group-hover:opacity-100' >
        <SubmitBoard
            classNameSelect='rounded-xl bg-white'
            onSubmit={handleMoodBoard}
            selectedMoodBoard={selectedMoodBoard}
            setMoodBoard={setMoodBoard}
            moodBoardData={moodBoardData}
            classNameButton='rounded-xl bg-white p-1'
        />
    </div >

const BookTitle = ({ title }) => <div className='text-black font-medium'>{title}</div>

export default function BookCard(props) {
    /**
     * This component returns a display
     * of the book which will be listed on the 
     * BookList components.
     */

    const moodBoardData = ['Sad Boy', 'Emo', 'Sunshine']
    const [selectedMoodBoard, setMoodBoard] = useState(moodBoardData[0] ?? '')

    async function handleMoodBoard(e) {
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
