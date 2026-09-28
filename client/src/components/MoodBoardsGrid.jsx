import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoodBoardServices from "../services/MoodboardService.js"
import BookServices from '../services/BookService.js'
import { useAuth } from '../auth/AuthContext'
import plus from '../assets/add.png'
import placeholder from '../assets/book-placeholder.jpg'

export default function MoodBoardsGrid() {
    /**
     * This component returns a list of mood boards.
     */

    const [moodboard, setMoodboard] = useState([])
    const [newMoodBoard, setNewMoodBoard] = useState('')
    const [books, setBooks] = useState([])
    const { isLoggedIn, authId } = useAuth()

    //Retrieves moodboards from /api/moodboard endpoint
    useEffect(() => {
        const loadBoard = async () => {
            const moodboards = await MoodBoardServices.getMoodBoardByUserId(authId)
            setMoodboard(moodboards)

            const moodboardBooks = await Promise.all(
                moodboards.map(moodboard => BookServices.getBookFromMoodboard(moodboard.id))
            )
            const book = await Promise.all(
                moodboardBooks.map(values =>
                    Promise.all(values.map(value => BookServices.getBookById(value.bookId)))
                )
            )

            setBooks(book)
        }

        loadBoard()
    }, [authId])

    const handleCreateMoodboard = async (e) => {
        e.preventDefault()
        const newObject = { id: authId, name: newMoodBoard }
        MoodBoardServices.createMoodBoard(newObject)
        setMoodboard(moodboard => [...moodboard, { id: authId, name: newMoodBoard }])
    }

    const deleteMoodBoard = async (e, id) => {
        e.preventDefault()
        //Remove board from database
        MoodBoardServices.deleteMoodBoard(id)
        const updatedData = moodboard.filter(i => i.id !== id)
        setMoodboard(updatedData)
    }

    const cssObjects = [
        {
            divClass: 'bg-red-100 h-25 w-25 rounded-tl-xl',
            imgClass: 'h-25 w-25 rounded-tl-xl',
        },
        {
            divClass: 'bg-blue-100 h-25 w-25 rounded-tr-xl',
            imgClass: 'h-25 w-25 rounded-tr-xl'

        },
        {
            divClass: 'bg-yellow-100 h-25 w-25 rounded-bl-xl',
            imgClass: 'h-25 w-25 rounded-bl-xl'

        },
        {
            divClass: 'bg-green-100 h-25 w-25 rounded-br-xl',
            imgClass: 'h-25 w-25 rounded-br-xl'
        }
    ]

    return (
        <>
            {isLoggedIn ? <section className='max-w-full min-w-0 flex flex-wrap m-6 flex-col'>
                <div className="flex flex-col gap-5 items-start">
                    <div className="">
                        <form className='flex gap-5 justify-center items-center'>
                            <input
                                type='text'
                                className='px-2 shadow-md rounded-md border border-gray-200 p-0 h-[50px] w-[300px] max-h-full min-h-0 max-w-full min-w-0'
                                value={newMoodBoard}
                                onChange={e => setNewMoodBoard(e.target.value)}
                            ></input>
                            <button className='w-[50px] focus:outline-2 focus:outline-blue-500 rounded-full' type="submit" onClick={(e) => handleCreateMoodboard(e)}><img className='w-[50px] max-w-full min-w-0' src={plus} alt='plus or addition icon' /></button>
                        </form>
                    </div>
                </div>

                <ul className="mt-15 flex flex-wrap gap-5">
                        {
                            moodboard.map((value, index) => {
                                const link = `/moodboard/${value.id}`
                                const book = books[index] ?? []

                                const bookSrcZero = book[0]?.thumbnails?.[0] ?? placeholder
                                const bookSrcOne = book[1]?.thumbnails?.[0] ?? placeholder
                                const bookSrcTwo = book[2]?.thumbnails?.[0] ?? placeholder
                                const bookSrcThree = book[3]?.thumbnails?.[0] ?? placeholder

                                const bookSrc = [bookSrcZero, bookSrcOne, bookSrcTwo, bookSrcThree]

                                return (
                                    <li key={index}>
                                        <Link className='focus:outline-2 focus:outline-blue-500 rounded-md' to={link}>
                                            <div className='rounded-xl h-50 w-50 flex flex-wrap'>
                                                {
                                                    cssObjects.map((val, index) => (
                                                        <div className={val.divClass}><img className={val.imgClass} src={bookSrc[index]} alt=''/></div>
                                                    ))
                                                }
                                            </div>
                                        </Link>
                                        <h2 className='px-2 py-3 text-start font-bold text-xl text-neutral-900'>{value.name}</h2>
                                        <button className='focus:outline-2 focus:outline-blue-500 rounded-md' onClick={(e) => deleteMoodBoard(e, value.id)}>Delete Moodboard</button>
                                    </li>
                                )
                            })
                        }
                </ul>
            </section> : <div className='flex flex-col items-center gap-5 my-10 mx-8 text-neutral-900'>
                <div>Sorry, we are unable to show you your profile! <span className='underline'>Login by pressing the login button on the top-left</span>.</div>
            </div>}
        </>

    )
}
