import MoodBoardCard from './MoodboardCard'
import thumbnailPlaceHolder from '../assets/book-placeholder.jpg'

export default function MoodBoardsGrid() {
    /**
     * This component returns a list of mood boards.
     * 'Sad Boy', 'Emo', 'Sunshine'
     */
    const moodBoardData = [
        {
            title: 'Sad Boy',
            src: thumbnailPlaceHolder,
            alt: 'Sad Boy Moodboard',
            link: `/moodboard/1`,
        },
        {
            title: 'Emo',
            src: thumbnailPlaceHolder,
            alt: 'Emo Moodboard',
            link: `/moodboard/2`,
        },
        {
            title: 'Sunshine',
            src: thumbnailPlaceHolder,
            alt: 'Sunshine Moodboard',
            link: `/moodboard/3`,
        },
    ]

    return (
        <section className='flex-1 min-h-0 overflow-y-auto'>
            <h1>Your Book Moodboards</h1>
            <div className="flex gap-10 p-5">
                {moodBoardData.map((value, index) => {
                    return (
                        <MoodBoardCard
                            title={value.title}
                            src={value.src}
                            link={value.link}
                        />
                    )
                })}
            </div>
        </section>
    )
}