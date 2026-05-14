import MoodBoardCard from './MoodboardCard'

export default function MoodBoardsGrid(){
    /**
     * This component returns a list of mood boards.
     */
    const moodBoardData = [
        {
            'title': 'title of mood board',
            'src': 'image link',
            'link': '<MoodBoardImages/> component with inputs here',
        },
        {
            'title': 'title of mood board',
            'src': 'image link',
            'link': '<MoodBoardImages/> component with inputs here',
        },
        {
            'title': 'title of mood board',
            'src': 'image link',
            'link': '<MoodBoardImages/> component with inputs here',
        },
    ]

    return(
        <section className='flex-1 min-h-0 overflow-y-auto'>
            <div className="flex gap-10 p-5">
            {moodBoardData.map((value, index)=>{
                return(
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