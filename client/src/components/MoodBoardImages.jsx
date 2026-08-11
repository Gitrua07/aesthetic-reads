import { Link } from 'react-router-dom'

export default function MoodBoardImages(props) {
    /**
     * This component returns a list of images
     * given the dataset and will be displayed on the 
     * MoodBoardsGrid.jsx component.
     */

    //TODO: Retrive moodboard date from backend
    const moodboardName = 'my moodboard name'
    const numBooks = [
        {
            id: 0,
            'title': 'Hello',
            'link': '/moodboard/0',
            'src': '../public/favicon.svg',
            'alt': 'image 0',
            'book-link': `/book/0`
        },
        {
            id: 1,
            'title': 'Hello',
            'link': '/moodboard/1',
            'src': '../public/favicon.svg',
            'alt': 'image 0',
            'book-link': `/book/1`
        },
        {
            id: 2,
            'title': 'Hello',
            'link': '/moodboard/2',
            'src': '../public/favicon.svg',
            'alt': 'image 0',
            'book-link': `/book/2`
        },
    ]

    return (
        <div className="m-10 text-center">
            <h1 className="p-10 pb-20">{moodboardName}</h1>
            <div className='flex flex-wrap gap-10'>
                {
                    numBooks.map((value, index) => {
                        return (
                            <div key={index}>
                                <Link to={value['book-link']}>
                                    <div className="w-40 h-40 bg-gray-300 rounded-xl">
                                        <img src={value.src} alt={value.alt} />
                                    </div>
                                </Link>
                                <div className='font-bold'>{value.title}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}