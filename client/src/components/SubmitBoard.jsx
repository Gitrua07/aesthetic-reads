// import axios from 'axios'
import MoodBoardServices from '../services/Moodboard'

export default function SubmitBoard(props) {
    const {
        thumbnail,
        bookid,
        selectedMoodBoard,
        setMoodBoard,
        moodBoardData,
        setMoodBoardData,
        classNameSelect = '',
        classNameButton = '',
    } = props

    // console.log("Database --> ")
    // console.log(moodBoardData)
    const id = 'id' + (new Date()).getTime()

    /**
     * Save process: 
     */
    const saveBook = async(e) => {
        e.preventDefault()
        console.log(`1. Filter data of: `)
        console.log(moodBoardData)
        console.log(`And find the value: `)
        console.log(selectedMoodBoard)
        console.log("2. The isolated object -->")
        const moodBoardFilter = moodBoardData.filter(moodboard => moodboard.name === selectedMoodBoard)[0]
        console.log(moodBoardFilter)
        console.log(`3. Object with added bookid and thumbnail -->  `)
        const updatedMoodBoard = { ...moodBoardFilter, books: [...moodBoardFilter.books, bookid], thumbnails: [...moodBoardFilter.thumbnails, thumbnail]}
        console.log(updatedMoodBoard)
        console.log("call PUT method to update database -->")
        const update = await MoodBoardServices.updateMoodBoard(updatedMoodBoard.id, updatedMoodBoard)
        console.log(update)
        console.log("Then update the moodboard database: ")
        setMoodBoardData(update)
    }

    return (
        <div>
            <form className='flex flex-col gap-3' onSubmit={e => saveBook(e)}>
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
                <button type='submit' className={`focus:outline-2 focus:outline-blue-500 rounded-xl bg-white p-1 text-left ${classNameButton}`}>Save to moodboard</button>
            </form>
        </div>

    )
}