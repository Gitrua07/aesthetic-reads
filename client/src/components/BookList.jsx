import { useState } from 'react'
import BookCard from './BookCard'
import getBooks from '../api/getBook.js'
import thumbnailPlaceHolder from '../assets/book-placeholder.jpg'

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

    //----TEMP: Will be replaced by GET call to backend----
    const [moodBoardData, setMoodBoardData] = useState([{
        name: 'happy',
        link: '/moodboard/0',
        books: [],
        thumbnails: []
    },
    {
        name: 'sad',
        link: '/moodboard/1',
        books: [],
        thumbnails: []
    }])
    //----TEMP: Will be replaced by GET call to backend----

    let bookData = []

    const books = getBooks(props.query)
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

    return (
        <div className='flex-1 min-h-0 overflow-y-auto'>
                <h2 className="text-neutral-900 px-6 py-0 m-0">Results</h2>
                <ul className="flex flex-wrap gap-4 p-5 justify-center">
                    {bookData?.length > 0
                        ? bookData.map((value) => (<li><BookCard
                            thumbnail={value.thumbnail}
                            bookid={value.id}
                            title={value.title}
                            description={value.description}
                            src={value.thumbnail}
                            link={value.link}
                            author={value.author}
                            moodBoardData={moodBoardData}
                            setMoodBoardData={setMoodBoardData}
                        /></li>)) : <div>There are no results...</div>}
                </ul>
        </div>

    )
}