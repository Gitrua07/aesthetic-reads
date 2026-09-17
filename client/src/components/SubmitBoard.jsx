// import axios from 'axios'
import MoodBoardServices from '../services/Moodboard'
import { useEffect } from 'react'

const updateBooks = async(id, moodboard) => await MoodBoardServices.updateMoodBoard(id, moodboard)

export default function SubmitBoard(props) {
    const {
        thumbnail,
        bookid,
        handleMoodBoard, // matches BookCard prop
        selectedMoodBoard,
        setMoodBoard,
        moodBoardData,
        setMoodBoardData,
        classNameSelect = '',
        classNameButton = '',
    } = props

    /**
     * Save process: 
     */

    const saveBook = () => {
        const moodBoardObjArr = moodBoardData.filter(moodboard => Number(moodboard.id) === Number(selectedMoodBoard))
        const moodBoardObj = moodBoardObjArr[0]
        const updatedMoodBoard = {...moodBoardObj, books: [...moodBoardObj.books, bookid], thumbnails: [...moodBoardObj.thumbnails, thumbnail]}
        const moodBoardId = updatedMoodBoard.id
        updateBooks(moodBoardId, updatedMoodBoard)
        console.log(moodBoardId)
    }

    const id = 'id' + (new Date()).getTime()

    return (
        <div>
            <form className='flex flex-col gap-3' onSubmit={handleMoodBoard}>
                <label htmlFor={id} className='sr-only'>Choose a moodboard</label>
                <select
                    id={id}
                    className={`px-2 py-3 rounded-xl min-w-[70px] bg-white ${classNameSelect} focus:outline-2 focus:outline-blue-500`}
                    value={selectedMoodBoard}
                    onChange={e => setMoodBoard(e.target.value)}
                >
                    {moodBoardData.map((val) => (
                        <option key={val.name} value={val.name}>{val.name}</option>
                    ))}
                </select>
                <button type='submit' className={`focus:outline-2 focus:outline-blue-500 rounded-xl bg-white p-1 text-left ${classNameButton}`} onClick={() => saveBook()}>Save to moodboard</button>
            </form>
        </div>

    )
}