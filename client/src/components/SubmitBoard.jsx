import MoodBoardServices from "../services/MoodboardService.js"
import BookServices from '../services/BookService.js'
import { useAuth } from '../auth/AuthContext'

export default function SubmitBoard(props) {
    const {
        thumbnail,
        bookid,
        title,
        author,
        selectedMoodBoard,
        setMoodBoard,
        moodBoardData,
        classNameSelect = '',
        classNameButton = '',
    } = props

    const { isLoggedIn } = useAuth()
    const id = 'id' + (new Date()).getTime()

    const saveBook = async (e) => {
        e.preventDefault()
        if (moodBoardData[0] != null || moodBoardData.length > 0) {
            const moodboardFilter = moodBoardData.filter(moodboard => moodboard.name === selectedMoodBoard)[0]
            const moodboardId = moodboardFilter.id
            const bookId = bookid
            const data = {
                moodboardId: moodboardId,
                bookId: bookId,
                title: title,
                authors: author,
                thumbnails: [thumbnail]
            }

            await BookServices.addBookToMoodboard(data)
        }
    }

    return (
        <>
            {isLoggedIn ? <div>
                <form className='flex flex-col gap-3' onSubmit={e => saveBook(e)}>
                    <label htmlFor={id} className='sr-only'>Choose a moodboard</label>
                    <select
                        id={id}
                        className={`px-2 py-3 rounded-xl min-w-[70px] bg-white ${classNameSelect} focus:outline-2 focus:outline-blue-500`}
                        value={selectedMoodBoard}
                        onChange={e => setMoodBoard(e.target.value)}
                    >
                        {moodBoardData.map((val) => (
                            <option key={val.id} value={val.name}>{val.name}</option>
                        ))}
                    </select>
                    <button type='submit' className={`focus:outline-2 focus:outline-blue-500 rounded-xl bg-white p-1 text-left ${classNameButton}`}>Save to moodboard</button>
                </form>
                <label htmlFor={id} className='sr-only'>Choose a moodboard</label>
            </div> : <div></div>}
        </>


    )
}