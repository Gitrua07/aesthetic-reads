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
    const [loading, isLoading] = useState(true)
    console.log("Moodboard object retrieved --> ")
    console.log(moodboardsObj)

    useEffect(() => {
        MoodBoardService.getMoodBoard().then(data => {
            const id = moodBoardId.moodBoardId
            const filterObj = data.filter(d => d.id == id)[0]
            console.log(filterObj)
            usemoodboardsObj(filterObj)
            isLoading(false)
        })
    }, [moodBoardId])

    //----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----
    // const {
    //     authUser,
    //     setAuthUser,
    //     isLoggedIn,
    //     setLoggedIn } = useAuth()
    //----UNLOCK WHEN YOU ARE DOING AUTHENTICATION----


    const deleteBook = (e, index) => {
        e.preventDefault()
        const bookid = moodboardsObj.books[index]
        const thumbnailDelete = moodboardsObj.thumbnails[index]
        console.log("Deleted moodboard with current structure being --> ")
        const newMoodBoard = {...moodboardsObj, books: moodboardsObj.books.filter(book => bookid !== book), thumbnails: moodboardsObj.thumbnails.filter(thumbnail => thumbnail !== thumbnailDelete)}
        console.log(newMoodBoard)
        MoodBoardService.updateMoodBoard(moodboardsObj.id, newMoodBoard)
        usemoodboardsObj(newMoodBoard)
    }

    if (loading) return(<div>Loading...</div>)

    return (
        <div className="m-10 text-center"><h1 className="p-10 pb-20">{moodboardsObj.name}</h1>
            <div className='flex flex-wrap gap-10'>
                {moodboardsObj.books?.map((value, index) => {
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
