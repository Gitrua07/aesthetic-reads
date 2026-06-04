
export default function MoodBoardImages(props) {
    /**
     * This component returns a list of images
     * given the dataset and will be displayed on the 
     * MoodBoardsGrid.jsx component.
     */

    //TODO: Retrive moodboard date from backend

    const numBooks = [
        {
            title: 'Book 1',
            img: '',
            link: '',
        },
        {
            title: 'Book 1',
            img: '',
            link: '',
        },
        {
            title: 'Book 1',
            img: '',
            link: '',
        },
        {
            title: 'Book 1',
            img: '',
            link: '',
        },
        {
            title: 'Book 1',
            img: '',
            link: '',
        },
    ]

    return (
        <div className="m-10 text-center">
            <h1 className="p-10 pb-20">Mood Board Name</h1>
            <div className='flex flex-wrap gap-10'>
                {
                    numBooks.map((value, index) => {
                        return (
                            <div>
                                <div className="w-40 h-40 bg-gray-300 rounded-xl"></div>
                                <div className='font-bold'>{value.title}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}