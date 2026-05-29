import BookCard from './BookCard'
import getBooks from '../api/getBook.js'
import thumbnailPlaceHolder from '../assets/book-placeholder.jpg'

export default function BookList(props){
    /**
     * This component returns a list of all
     * available books taking into account any
     * user input.
     * TODO: 
     * [] Make UI pretty
     * [] Extra: If you rewind from a page, should not return a 
     *   blank page, should show the previous search result
     * [] Implement mood board tag feature
     */

    let bookData = []

    let books
    if (props.query != ''){
        books = getBooks(props.query)
        console.log(books)
        //append books into bookData array
        books.map((value, index) => {
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
    }

    return(
        <section className='flex-1 min-h-0 overflow-y-auto'>
            <div className="flex flex-wrap gap-4 p-5">
            {bookData.map((value,index)=>{
                return(<BookCard 
                    title={value.title} 
                    description={value.description}
                    src={value.thumbnail} 
                    link={value.link}
                    />)
            })}
            </div>
        </section>
        
    )
}