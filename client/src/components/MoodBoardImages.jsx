import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoodBoardServices from "../services/MoodboardService.js"
import BookServices from'../services/BookService.js'
import { useParams } from 'react-router-dom'


export default function MoodBoardImages() {
    /**
     * This component returns a list of images
     * given the dataset and will be displayed on the 
     * MoodBoardsGrid.jsx component.
     */

    const { moodBoardId } = useParams()
    const [moodboardsObj, setMoodboard] = useState({})
    const [books, setBooks] = useState([])

    useEffect(() => {
        const loadBook = async () => {
            const moodboard = await MoodBoardServices.getMoodBoardById(moodBoardId)
            setMoodboard(moodboard)

            if (!moodboard.id) return 

            const moodboardBooks = await BookServices.getBookFromMoodboard(moodboard.id)

            const books = await Promise.all(
                moodboardBooks.map((moodboardBook) => BookServices.getBookById(moodboardBook.bookId))
            )
            setBooks(books)
        }

        loadBook()
    }, [moodBoardId])

    const deleteBook = async (e, index) => {
        e.preventDefault()
        const bookid = books[index].id
        await BookServices.deleteBook(moodBoardId, bookid)
        setBooks(books.filter(book => book.id != bookid))
    }

    return (
        <div className="m-10 text-center">
            <title>Your Moodboard - Aesthetic Reads</title>
            <h1 className="text-neutral-900 p-10 pb-20 text-left">{moodboardsObj.name ?? ""}</h1>
            <ul className='flex flex-wrap gap-5'>
                {books?.map((value, index) => {
                    const link = `/book/${value.id}`
                    const alt = `leads to ${value.title} book page`
                    return (
                        <li className="flex flex-col gap-2" key={index}>
                            <Link className="focus:outline-2 focus:outline-blue-500 rounded-xl" to={link}>
                                <img className="rounded-xl w-35" src={value.thumbnails[0]} alt={alt} />
                            </Link>
                            <button className="text-sm focus:outline-2 focus:outline-blue-500 rounded-xl text-left" onClick={(e) => deleteBook(e, index)}>Delete Book</button>
                        </li>
                    )
                })}
            </ul>
        </div>

    )
}
