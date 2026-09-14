import { Link } from 'react-router-dom'

export default function MoodBoardImages(props) {
    /**
     * This component returns a list of images
     * given the dataset and will be displayed on the 
     * MoodBoardsGrid.jsx component.
     */

    //TODO: Retrive moodboard date from backend
    const moodboardsObj = {
        "name": "happy",
        "link": "/moodboard/0",
        "books": [
            "q-hBEAAAQBAJ",
            "ea1PAQAAMAAJ",
            "Rz47AQAAMAAJ",
            "rZIpAAAAYAAJ",
            "pgcCAAAAYAAJ"
        ],
        "thumbnails": [
            "http://books.google.com/books/content?id=q-hBEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "http://books.google.com/books/content?id=ea1PAQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "http://books.google.com/books/content?id=Rz47AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "http://books.google.com/books/content?id=rZIpAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "http://books.google.com/books/content?id=pgcCAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        ]
    }

    return (
        <div className="m-10 text-center">
            <h1 className="p-10 pb-20">{moodboardsObj.name}</h1>
            <div className='flex flex-wrap gap-10'>
                {moodboardsObj.books.map((value, index) => {
                    const link = `/book/${value}`
                    return (
                        <div key={index}>
                            <Link to={link}>
                                <div className="">
                                    <img className="rounded-xl" src={moodboardsObj.thumbnails[index]} alt={value} />
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}