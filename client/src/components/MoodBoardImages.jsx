import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function MoodBoardImages(props) {
    /**
     * This component returns a list of images
     * given the dataset and will be displayed on the 
     * MoodBoardsGrid.jsx component.
     */
    const [moodboardsObj, usemoodboardsObj] = useState({
        name: "happy",
        link: "/moodboard/0",
        books: [
            "q-hBEAAAQBAJ",
            "ea1PAQAAMAAJ",
            "Rz47AQAAMAAJ",
            "rZIpAAAAYAAJ",
            "pgcCAAAAYAAJ"
        ],
        thumbnails: [
            "http://books.google.com/books/content?id=q-hBEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "http://books.google.com/books/content?id=ea1PAQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "http://books.google.com/books/content?id=Rz47AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "http://books.google.com/books/content?id=rZIpAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
            "http://books.google.com/books/content?id=pgcCAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        ]
    })
    //TODO: Retrive moodboard date from backend
    // const moodboardsObj = {
    //     "name": "happy",
    //     "link": "/moodboard/0",
    //     "books": [
    //         "q-hBEAAAQBAJ",
    //         "ea1PAQAAMAAJ",
    //         "Rz47AQAAMAAJ",
    //         "rZIpAAAAYAAJ",
    //         "pgcCAAAAYAAJ"
    //     ],
    //     "thumbnails": [
    //         "http://books.google.com/books/content?id=q-hBEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    //         "http://books.google.com/books/content?id=ea1PAQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    //         "http://books.google.com/books/content?id=Rz47AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    //         "http://books.google.com/books/content?id=rZIpAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    //         "http://books.google.com/books/content?id=pgcCAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    //     ]
    // }

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn } = useAuth()

    const deleteBook = (e, index) => {
        e.preventDefault()
        usemoodboardsObj(moodboards => ({
            ...moodboards,
            books: moodboards.books.filter((_, i) => i !== index),
            thumbnails: moodboards.thumbnails.filter((_, i) => i !== index)
        }))

    }

    return (
        <>
            {
                isLoggedIn ? <div className="m-10 text-center"><h1 className="p-10 pb-20">{moodboardsObj.name}</h1>
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
                                    <button onClick={(e) => deleteBook(e, index)}>Delete Book</button>
                                </div>
                            )
                        })}
                    </div></div> : <div className='flex flex-col items-center gap-5 my-10 mx-8 text-neutral-900'>
                <div>Sorry, we are unable to show you your profile! <span className='underline'>Login by pressing the login button on the top-left</span>.</div>
                </div>
            }
        </>

    )
}