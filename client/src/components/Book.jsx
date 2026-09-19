import { useParams } from 'react-router-dom'
import useOneBook from '../api/getOneBook.js'
import thumbnailPlaceHolder from '../assets/book-placeholder.jpg'
import { useState, useEffect } from 'react'
import SaveMoodBoard from "./SaveMoodBoard"
import MoodBoardServices from '../services/Moodboard.js'

const BookTitle = ({ bookTitle }) => <h1>{bookTitle}</h1>

const Authors = ({ bookAuthor }) =>
    <div>by {bookAuthor.map((val, index) => {
        let textVal = index != bookAuthor.length - 1 ? val + ',' : val
        return (
            <span key={index}>{textVal} </span>
        )
    })}
    </div>

const BookSummary = ({ bookDesc }) =>
    <div className="w-1/2 p-10 border border-[rgb(199,199,191)] rounded-xl m-10">
        <h2>Summary</h2>
        <div>{bookDesc}</div>
    </div>

// const getMoodBoard = await MoodBoardServices.getMoodBoard()

export default function Book() {
    /**
     * Book:
     * Implements a page which state the following properties of a book:
     *  - Title
     *  - Author(s)
     *  - Image of cover thumbnail
     *  - Assigning mood board tag
     *  - Summary
     */

    const { bookId } = useParams()
    const book = useOneBook(bookId)
    const bookInfo = book?.volumeInfo
    const bookTitle = bookInfo?.title
    const bookAuthor = bookInfo?.authors ?? ['Not Available']

    //Obtains the book description by parsing it into html -> text
    const domParse = new DOMParser()
    const description = bookInfo?.description
    const bookDesc = description ? domParse.parseFromString(description, 'text/html').body.textContent : 'No description available.'
    let imageSrc = bookInfo?.imageLinks ?? thumbnailPlaceHolder
    //Checks if image small size exists
    if (imageSrc != thumbnailPlaceHolder) {
        imageSrc = !bookInfo?.imageLinks?.small ? bookInfo?.imageLinks?.small : bookInfo?.imageLinks?.thumbnail
    }

    const [moodBoardData, setMoodBoardData] = useState([])
    const [selectedMoodBoard, setMoodBoard] = useState('')
    const [loading, setLoading] = useState(true)
    console.log("1. MoodBoardData --> ")
    console.log(moodBoardData)
    
    async function handleMoodBoard(e) {
        e.preventDefault()
        // await fetch('/api/moodboard', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ mood: selectedMoodBoard, bookId: bookId })
        // })
    }

    useEffect(() => {
        MoodBoardServices.getMoodBoard().then(data => {
            setMoodBoardData(data)
            setMoodBoard(data[0]?.name)
            setLoading(false)
        })
    }, [])

    if (loading) return (<div>Loading...</div>)

    return (
        <div className="text-black p-5 my-15 mx-10">
            <title>Book Info - Aesthetic Reads</title>
            <BookTitle bookTitle={bookTitle} />
            <Authors bookAuthor={bookAuthor} />
            <div className="flex">
                <SaveMoodBoard
                    bookid={bookId}
                    thumbnail={imageSrc}
                    moodBoardData={moodBoardData}
                    imageSrc={imageSrc}
                    handleMoodBoard={handleMoodBoard}
                    selectedMoodBoard={selectedMoodBoard}
                    setMoodboard={setMoodBoard}
                    setMoodBoardData={setMoodBoardData}
                />
                <BookSummary bookDesc={bookDesc} />
            </div>
        </div>
    )
}
