import BookCard from './BookCard'
// import getBooks from '../api/getBook.js'

export default function BookList(props){
    /**
     * This component returns a list of all
     * available books taking into account any
     * user input.
     */
    // const books = getBooks('harry potter')

    const bookData = [
        {
            'title': 'title here',
            'src': 'image link here',
            'link': 'link to page here',
        },
        {
            'title': 'title here',
            'src': 'image link here',
            'link': 'link to page here',
        },
        {
            'title': 'title here',
            'src': 'image link here',
            'link': 'link to page here',
        },
    ]

    return(
        <section className='flex-1 min-h-0 overflow-y-auto'>
            <div className="flex gap-10 p-5">
            {bookData.map((value,index)=>{
                return(<BookCard 
                    title={value.title} 
                    src={value.src} 
                    link={value.link}
                    />)
            })}
            </div>
        </section>
        
    )
}