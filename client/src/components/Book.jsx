import { useParams } from 'react-router-dom'
import useOneBook from '../api/getOneBook.js'
import thumbnailPlaceHolder from '../assets/book-placeholder.jpg'
import { useState } from 'react'
import SubmitBoard from "./SubmitBoard"
import SaveMoodBoard from "./SaveMoodBoard"

const BookTitle = ({ bookTitle }) => <h2>{bookTitle}</h2>

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

    //TODO: Make this into a JSON/sql file
    const moodBoardData = ['Sad Boy', 'Emo', 'Sunshine']
    const [selectedMoodBoard, setMoodBoard] = useState(moodBoardData[0] ?? '')

    async function handleMoodBoard(e) {
        e.preventDefault()
        await fetch('/api/moodboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mood: selectedMoodBoard, bookId: bookId })
        })
    }

    return (
        <div className="text-black p-5 my-15 mx-10">
            <BookTitle bookTitle={bookTitle} />
            <Authors bookAuthor={bookAuthor} />
            <div className="flex">
                <SaveMoodBoard
                    moodBoardData={moodBoardData}
                    imageSrc={imageSrc}
                    handleMoodBoard={handleMoodBoard}
                    selectedMoodBoard={selectedMoodBoard}
                    setMoodboard={setMoodBoard}
                />
                <BookSummary bookDesc={bookDesc} />
            </div>
        </div>
    )
}
