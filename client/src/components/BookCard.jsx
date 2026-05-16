import { Link } from 'react-router-dom'

export default function BookCard(props) {
    /**
     * This component returns a display
     * of the book which will be listed on the 
     * BookList components.
     */
    const moodBoardData = ['Sad Boy', 'Emo', 'Sunshine']

    return (
        <article className="w-40">
            <div className='relative group'>
                <Link to={props.link} >
                    <img className="rounded-xl w-80" src={props.src} />
                </Link>
                 <div className='text-black flex p-2 gap-5 absolute bottom-0 opacity-0 group-hover:opacity-100'>
                        <select className='rounded-xl bg-white '>
                            {moodBoardData.map((val) => {
                                return (
                                    <option key={val} value={val}>{val}</option>
                                )
                            })}
                        </select>
                        <button className='rounded-xl bg-white p-1'>Save</button>
                    </div>
            </div>
            <div className='text-black font-medium'>{props.title}</div>
        </article>
    )
}
