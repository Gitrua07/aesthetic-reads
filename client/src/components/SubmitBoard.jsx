// import axios from 'axios'
import MoodBoardServices from '../services/Moodboard'

export default function SubmitBoard(props) {
    const {
        thumbnail,
        bookid,
        title,
        author,
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
    const saveBook = async (e) => {
        e.preventDefault()
        if (moodBoardData[0] != null) {
            const moodboardFilter =  moodBoardData.filter(moodboard => moodboard.name === selectedMoodBoard)[0]
            const moodboardId = moodboardFilter.id
            const bookId = bookid
            console.log('Id of selected moodboard --> ',moodboardId)
            console.log('Id of selected book --> ', bookId)
            console.log('authors --> ', author)
            const data = {
                moodboardId: moodboardId,
                bookId: bookId,
                title: title,
                authors: [author],
                thumbnails: [thumbnail]
            }
            console.log("Data sent to back end --> ", data)
            const addBook = await MoodBoardServices.addBookToMoodboard(data)
            console.log("Returned data from back-end", addBook)
        }else{
            console.log("Empty array")
        }
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