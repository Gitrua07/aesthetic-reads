import SubmitBoard from "./SubmitBoard"
import { useAuth } from "../auth/AuthContext"

const BookCover = ({ imageSrc }) => <img className='h-100 rounded-xl' src={imageSrc} alt='cover of book' />

export default function SaveMoodBoard(props) {
    const {moodBoardData, selectedMoodBoard, setMoodBoard, setMoodBoardData, bookid, thumbnail, author, title } = props

    const { isLoggedIn } = useAuth()

    return (
        <div className="mr-5 mt-5 pr-5 pt-5">
            <BookCover imageSrc={thumbnail} />
            <div className="flex gap-5 mt-5 ">
                <div className="font-light">
                    Mood Board:
                </div>
                {isLoggedIn ? <SubmitBoard
                    classNameSelect='px-3 border rounded-xl'
                    thumbnail={thumbnail}
                    bookid={bookid}
                    author={author}
                    title={title}
                    selectedMoodBoard={selectedMoodBoard}
                    setMoodBoard={setMoodBoard}
                    moodBoardData={moodBoardData}
                    setMoodBoardData={setMoodBoardData}
                    classNameButton='font-medium rounded-xl bg-white border px-3'
                /> : <div className="italic text-gray-500">Login to save moodboards</div>}
            </div>
        </div>
    )
}