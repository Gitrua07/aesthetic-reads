import SearchBar from "./SearchBar"
import { useParams } from 'react-router-dom'
import useOneBook from '../api/getOneBook.js'

export default function Book() {
    /**
     * Book:
     * Implements a page which state the following properties of a book:
     *  - Title
     *  - Author(s)
     *  - Image of cover thumbnail
     *  - Assigning mood board tag
     *  - Summary
     * TODO:
     *  [] Implement mood board tag feature
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

    //Checks if image small size exists
    let imageSrc = !bookInfo?.imageLinks?.small ? bookInfo?.imageLinks?.small : bookInfo?.imageLinks?.thumbnail
    
    //TODO: Make this into a JSON/sql file
    const moodBoardData = ['Sad Boy', 'Emo', 'Sunshine']

    return (
        <div className="text-black p-5">
            <SearchBar />
            <div className="my-15 mx-10">
                <h2>{bookTitle}</h2>
                <div>by {bookAuthor.map((val, index) => {
                    let textVal = index != bookAuthor.length - 1 ? val + ',' : val
                    return (
                        <span key={index}>{textVal} </span>
                    )
                })}</div>
                <div className="flex">
                    <div className="bg-red-1 mr-5 mt-5 pr-5 pt-5">
                        <img className='h-100 rounded-xl' src={imageSrc} alt='cover of book' />
                        <div className="flex gap-5 mt-5 ">
                            <div className="py-1 font-light">
                                Mood Board: 
                            </div>
                            <select className="px-3 py-1 border rounded-xl">
                                {moodBoardData.map((val) => {
                                    return (
                                        <option key={val} value={val}>
                                            {val}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="w-1/2 p-10 border border-[rgb(199,199,191)] rounded-xl m-10">
                        <h2>Summary</h2>
                        <div>{bookDesc}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
