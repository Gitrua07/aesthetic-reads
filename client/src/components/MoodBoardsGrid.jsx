import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoodBoardCard from './MoodboardCard'
import axios from 'axios'
import MoodBoardServices from "../services/Moodboard.js"
import { useAuth } from '../auth/AuthContext'

// import { v4 as uuidv4 } from 'uuid'

export default function MoodBoardsGrid() {
    /**
     * This component returns a list of mood boards.
     * 'Sad Boy', 'Emo', 'Sunshine'
     */
    const [moodboard, setMoodboard] = useState([])
    const [newMoodBoard, setNewMoodBoard] = useState('')
    const [books, setBooks] = useState([])
    console.log("Book here --> ", books)
    //Retrieves moodboards from /api/moodboard endpoint
    useEffect(() => {
        const loadBoard = async () => {
            const moodboards = await MoodBoardServices.getMoodBoard()
            setMoodboard(moodboards)

            const moodboardBooks = await Promise.all(
                moodboards.map(moodboard => MoodBoardServices.getBookFromMoodboard(moodboard.id))
            )
            const book = await Promise.all(
                moodboardBooks.map(values =>
                    Promise.all(values.map(value => MoodBoardServices.getBookById(value.bookId)))
                )
            )

            setBooks(book)
        }

        loadBoard()
    }, [])

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn } = useAuth()


    const createMoodBoardT = async (e) => {
        e.preventDefault()
        const newObject = { name: newMoodBoard }
        MoodBoardServices.createMoodBoard(newObject)
        setMoodboard(moodboard => [...moodboard, { name: newMoodBoard }])
        console.log("CREATED!")
    }

    const deleteMoodBoard = async (e, id) => {
        e.preventDefault()
        //Remove board from database
        MoodBoardServices.deleteMoodBoard(id)
        const updatedData = moodboard.filter(i => i.id !== id)
        setMoodboard(updatedData)
        console.log("DELETED!")
    }

    const cssObjects = [
        {
            divClass: 'bg-red-100 h-25 w-25 rounded-tl-xl',
            imgClass: 'h-25 w-25 rounded-tl-xl'
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
                    <h1 className="text-neutral-900">Your Moodboards</h1>
                    <div className="">
                        <form className='flex gap-5 justify-center items-center'>
                            <input
                                type='text'
                                className='px-2 shadow-md rounded-md border border-gray-200 p-0 h-[50px] w-[300px] max-h-full min-h-0 max-w-full min-w-0'
                                value={newMoodBoard}
                                onChange={e => setNewMoodBoard(e.target.value)}
                            ></input>
                            <button type="submit" onClick={(e) => createMoodBoardT(e)}><img className='w-[50px] max-w-full min-w-0' src='src\assets\add.png' /></button>
                        </form>
                    </div>
                </div>

                <div className="mt-15 flex flex-wrap gap-5">
                    {
                        moodboard.map((value, index) => {
                            const link = `/moodboard/${value.id}`
                            // getBookInfo(value.id)
                            //   if (!value.link || !value.thumbnails) return (<div key={index}></div>)
                            //<img className={cssObjects[index].imgClass} src={value.thumbnails[0]} alt={value.books[0]} />             
                            console.log('index --> ', index)
                            console.log('books --> ', books[index])
                            const book = books[index] ?? []

                            const bookSrcZero = book[0]?.thumbnails?.[0]
                            const bookSrcOne = book[1]?.thumbnails?.[0]
                            const bookSrcTwo = book[2]?.thumbnails?.[0]
                            const bookSrcThree = book[3]?.thumbnails?.[0]

                            const bookAltZero = book[0]?.title ?? ''
                            const bookAltOne = book[1]?.title ?? ''
                            const bookAltTwo = book[2]?.title ?? ''
                            const bookAltThree = book[3]?.title ?? ''
                            return (
                                <div key={index}>
                                    <Link to={link}>
                                        <div className='h-50 w-50 flex flex-wrap rounded-xl'>
                                            <div className={cssObjects[0].divClass}><img className={cssObjects[0].imgClass} src={bookSrcZero} /></div>
                                            <div className={cssObjects[1].divClass}><img className={cssObjects[1].imgClass} src={bookSrcOne} /></div>
                                            <div className={cssObjects[2].divClass}><img className={cssObjects[2].imgClass} src={bookSrcTwo} /></div>
                                            <div className={cssObjects[3].divClass}><img className={cssObjects[3].imgClass} src={bookSrcThree} /></div>
                                        </div>
                                    </Link>
                                    <div className='px-2 py-3 text-start font-bold text-xl text-neutral-900'>{value.name}</div>
                                    <button onClick={(e) => deleteMoodBoard(e, value.id)}>Delete Moodboard</button>
                                </div>
                            )
                        })
                    }
                </div>
            </section> : <div className='flex flex-col items-center gap-5 my-10 mx-8 text-neutral-900'>
                <div>Sorry, we are unable to show you your profile! <span className='underline'>Login by pressing the login button on the top-left</span>.</div>
            </div>}
        </>

    )
}
