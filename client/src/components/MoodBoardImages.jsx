import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MoodBoardService from '../services/Moodboard'
import { useParams } from 'react-router-dom'

//----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----
// import { useAuth } from '../auth/AuthContext'
//----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----

export default function MoodBoardImages() {
    /**
     * This component returns a list of images
     * given the dataset and will be displayed on the 
     * MoodBoardsGrid.jsx component.
     */
    const moodBoardId = useParams()
    const [moodboardsObj, usemoodboardsObj] = useState({})
    const [books, setBooks] = useState([])
    console.log("Moodboard object retrieved --> ")
    console.log(moodboardsObj)

    useEffect(() => {
        // MoodBoardService.getMoodBoard().then(data => {
        //     const id = moodBoardId.moodBoardId
        //     const filterObj = data.filter(d => d.id == id)[0]
        //     console.log(filterObj)
        //     usemoodboardsObj(filterObj)
        //     isLoading(false)
        // })
        const loadBook = async() => {
            const moodboard = await MoodBoardService.getMoodBoardById(moodBoardId.moodBoardId)
            usemoodboardsObj(moodboard)

            const moodboardBooks = await MoodBoardService.getBookFromMoodboard(moodboard.id)
            console.log("moodboardBooks --> ", moodboardBooks)

            const books = await Promise.all(
                moodboardBooks.map((moodboardBook) => MoodBoardService.getBookById(moodboardBook.bookId))
            )
            console.log("books retrieved --> ", books)
            setBooks(books)
        }

        loadBook()
    }, [moodBoardId])

    //----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----
    // const {
    //     authUser,
    //     setAuthUser,
    //     isLoggedIn,
    //     setLoggedIn } = useAuth()
    //----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----


    const deleteBook = async(e, index) => {
        e.preventDefault()
        const bookid = books[index].id
        console.log(bookid)
        const deleteBook = await MoodBoardService.deleteBook(moodBoardId.moodBoardId, bookid)
        console.log("deleted this book --> ", deleteBook)
        setBooks(books.filter(book => book.id != bookid))
    }

    return (
        <div className="m-10 text-center"><h1 className="p-10 pb-20">{moodboardsObj.name}</h1>
            <div className='flex flex-wrap gap-10'>
                {books?.map((value, index) => {
                    const link = `/book/${value.id}`
                    return (
                        <div key={index}>
                            <Link to={link}>
                                <div className="">
                                    <img className="rounded-xl" src={value.thumbnails[0]} alt={value.title} />
                                </div>
                            </Link>
                            <button onClick={(e) => deleteBook(e, index)}>Delete Book</button>
                        </div>
                    )
                })}
            </div></div>

    )
}

//----REPLACE THIS IN RETURN WHEN DOING AUTHENTICATION----
{/* <>
{
    isLoggedIn ? <div className="m-10 text-center"><h1 className="p-10 pb-20">{moodboardsObj.name}</h1>
        <div className='flex flex-wrap gap-10'>
            {moodboardsObj.books.map((value, index) => {
                const link = `/book/${value}`
                return (
                    <div key={index}>
                        <Link to={link}>
                            <div className="">
                                <img className="rounded-xl" src={moodboardsObj.thumbnails[index]} alt={value} />
                            </div>
                        </Link>
                        <button onClick={(e) => deleteBook(e, index)}>Delete Book</button>
                    </div>
                )
            })}
        </div></div> : <div className='flex flex-col items-center gap-5 my-10 mx-8 text-neutral-900'>
    <div>Sorry, we are unable to show you your profile! <span className='underline'>Login by pressing the login button on the top-left</span>.</div>
    </div>
}
</> */}
//----REPLACE THIS IN RETURN WHEN DOING AUTHENTICATION----
