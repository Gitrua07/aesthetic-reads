import { Link } from 'react-router-dom'
import SubmitBoard from './SubmitBoard'
import thumbnailPlaceHolder from '../assets/book-placeholder.jpg'

const BookTitle = ({ title }) => <h3 className='text-black font-medium'>{title}</h3>

export default function BookCard(props) {
    /**
     * This component returns a display
     * of the book which will be listed on the 
     * BookList components.
     */

    const { thumbnail,
        bookid,
        link,
        src,
        title,
        author,
        moodBoardData,
        setMoodBoardData,
        selectedMoodBoard,
        setMoodBoard } = props

    return (
        <article className="w-40">
            <div className='relative group'>
                <Link to={link} >
                    <img className="rounded-xl w-80" src={src ?? thumbnailPlaceHolder} alt={`thumbnail cover of the book - ${title} `} />
                </Link>
                <div className='text-black flex p-2 gap-5 absolute bottom-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100' >
                    <SubmitBoard
                        classNameSelect='rounded-xl bg-white'
                        thumbnail={thumbnail}
                        bookid={bookid}
                        title={title}
                        author={author}
                        selectedMoodBoard={selectedMoodBoard}
                        setMoodBoard={setMoodBoard}
                        moodBoardData={moodBoardData}
                        setMoodBoardData={setMoodBoardData}
                        classNameButton='rounded-xl bg-white p-1'
                    />
                </div >
            </div>
            <BookTitle title={title} />
            <div className='text-sm italic'>{author}</div>
        </article>
    )
}