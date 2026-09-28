import { useParams } from 'react-router-dom'
import useOneBook from '../api/getOneBook.js'
import thumbnailPlaceHolder from '../assets/book-placeholder.jpg'
import { useState, useEffect } from 'react'
import SaveMoodBoard from "./SaveMoodBoard"
import MoodBoardServices from "../services/MoodboardService.js"
import { useAuth } from '../auth/AuthContext.jsx'

const BookTitle = ({ bookTitle }) => <h1>{bookTitle}</h1>

const Authors = ({ bookAuthor }) =>
    <div>by {bookAuthor.join(', ')}</div>

const BookSummary = ({ bookDesc }) =>
    <div className="w-1/2 p-10 border border-[rgb(199,199,191)] rounded-xl m-10">
        <h2>Summary</h2>
        <div>{bookDesc}</div>
    </div>

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
    const { authId } = useAuth()

    //Obtains the book description by parsing it into html -> text
    const domParse = new DOMParser()
    const description = bookInfo?.description
    const bookDesc = description ? domParse.parseFromString(description, 'text/html').body.textContent : 'No description available.'
    const imageSrc = bookInfo?.imageLinks?.small ?? bookInfo?.imageLinks?.thumbnail ?? thumbnailPlaceHolder
    

    const [moodBoardData, setMoodBoardData] = useState([])
    const [selectedMoodBoard, setMoodBoard] = useState('')

    useEffect(() => {
        MoodBoardServices.getMoodBoardByUserId(authId).then(data => {
            setMoodBoardData(data)
            setMoodBoard(data[0]?.name)
        })
    }, )

    return (
        <div className="text-black p-5 my-15 mx-10">
            <title>Book Info - Aesthetic Reads</title>
            <BookTitle bookTitle={bookTitle} />
            <Authors bookAuthor={bookAuthor} />
            <div className="flex">
                <SaveMoodBoard
                    bookid={bookId}
                    thumbnail={imageSrc}
                    author={bookAuthor}
                    title={bookTitle}
                    moodBoardData={moodBoardData}
                    selectedMoodBoard={selectedMoodBoard}
                    setMoodBoard={setMoodBoard}
                    setMoodBoardData={setMoodBoardData}
                />
                <BookSummary bookDesc={bookDesc} />
            </div>
        </div>
    )
}
