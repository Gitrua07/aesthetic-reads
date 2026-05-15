import BookCard from './BookCard'
import getBooks from '../api/getBook.js'

export default function BookList(props){
    /**
     * This component returns a list of all
     * available books taking into account any
     * user input.
     */
    let bookData = []

    let books
    if (props.query != ''){
        books = getBooks(props.query)
        //append books into bookData array
        books.map((value, index) => {
            let bookInfo = {
                "title": value.volumeInfo.title,
                "author": value.volumeInfo.authors,
                "description": value.volumeInfo.description,
                "src": value.volumeInfo.imageLinks,
                "link": `/${encodeURIComponent(value.volumeInfo.title)}`,
            }
            bookData.push(bookInfo)
        })
    }


    return(
        <section className='flex-1 min-h-0 overflow-y-auto'>
            <div className="flex flex-wrap gap-4 p-5">
            {bookData.map((value,index)=>{
                return(<BookCard 
                    title={value.title} 
                    src={value.src.thumbnail} 
                    link={value.link}
                    />)
            })}
            </div>
        </section>
        
    )
}