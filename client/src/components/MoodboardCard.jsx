import MoodBoardImages from './MoodBoardImages'
import { Link } from 'react-router-dom'

export default function MoodBoardCard(props) {
    /**
     * This component returns a list of images
     * given the dataset and will be displayed on the 
     * MoodBoardsGrid.jsx component.
     */

    return (
        <article className='text-center gap-5'>
            <div className='w-40 h-40 bg-gray-300 rounded-xl'>
                <Link to={props.link}>
                    <img className='w-40 h-40 rounded-xl' src={props.src} alt={props.alt} />
                </Link>
            </div>
            <div>{props.title}</div>
        </article>
    )
}