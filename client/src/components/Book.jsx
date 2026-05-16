import SearchBar from "./SearchBar"
import { useParams } from 'react-router-dom'
import useOneBook from '../api/getOneBook.js'

export default function Book() {
    const { bookId } = useParams()
    const book = useOneBook(bookId)
    const bookInfo = book?.volumeInfo
    console.log(bookInfo)
    
    const DomParse = new DOMParser()
    const description = bookInfo?.description
    let desc = DomParse.parseFromString(description,'text/html').body.textContent
    return (
        <div className="text-black p-6">
            <SearchBar />
            <div className="m-10">
                <h1>{bookInfo?.title}</h1>
                <div>by {bookInfo?.authors.map((val, index) => {
                    return(
                        <span>{val} </span>
                    )
                })}</div>
                <div className="flex p-10">
                    <div>
                        <img src={bookInfo?.imageLinks?.small} />
                    </div>
                    <div className="w-1/2 p-10">
                        <h2>Summary: </h2>
                        <div>{desc}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
