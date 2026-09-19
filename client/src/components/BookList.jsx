import BookCard from './BookCard'
import getBooks from '../api/getBook.js'
import thumbnailPlaceHolder from '../assets/book-placeholder.jpg'
import { useState, useEffect } from 'react'
import MoodBoardServices from '../services/Moodboard'

export default function BookList(props) {
    /**
     * This component returns a list of all
     * available books taking into account any
     * user input.
     * TODO: 
     * [X] Make UI pretty
     * [] Extra: If you rewind from a page, should not return a 
     *   blank page, should show the previous search result
     * [X] Implement mood board tag feature
     */

    const [moodBoardData, setMoodBoardData] = useState([])
    const [selectedMoodBoard, setMoodBoard] = useState('')
    const [loading, setLoading] = useState(true)
    let bookData = []
    const books = getBooks(props.query)
    console.log(selectedMoodBoard)

    //Retrieves moodboard data from backend
    useEffect(() => {
        MoodBoardServices.getMoodBoard().then(data => {
            if (data.length > 0) {
                setMoodBoardData(data)
                setMoodBoard(data[0].name)
                setLoading(false)
            }
        })
    }, [])


    //append books into bookData array
    books.map((value) => {
        let bookInfo = {
            "id": value.id,
            "title": value.volumeInfo.title,
            "author": value.volumeInfo.authors,
            "description": value.volumeInfo.description,
            "link": `/book/${value.id}`,
            "thumbnail": value.volumeInfo.imageLinks?.thumbnail ?? thumbnailPlaceHolder
        }
        bookData.push(bookInfo)
    })

    if (loading) return (<div>Loading...</div>)

    return (
        <div className='flex-1 min-h-0 overflow-y-auto'>
            <h2 className="text-neutral-900 px-6 py-0 m-0">Results</h2>
            <ul className="flex flex-wrap gap-4 p-5 justify-center">
                {bookData?.length > 0
                    ? bookData.map((value, index) => (<li key={index}><BookCard
                        thumbnail={value.thumbnail}
                        bookid={value.id}
                        title={value.title}
                        description={value.description}
                        src={value.thumbnail}
                        link={value.link}
                        author={value.author}
                        moodBoardData={moodBoardData}
                        setMoodBoardData={setMoodBoardData}
                        selectedMoodBoard={selectedMoodBoard}
                        setMoodBoard={setMoodBoard}
                    /></li>)) : <div>There are no results...</div>}
            </ul>
        </div>

    )
}