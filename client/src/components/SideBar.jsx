import { SideBarData } from './SideBarData'
import { Link } from 'react-router-dom'

export default function SideBar() {
    /**
     * This component returns a side bar which
     * will contain the home and gallery button.
     */

    return (
        <nav aria-label='Main' className="flex bg-[rgb(255,255,255)] justify-center min-h-screen w-[80px] max-w-full min-w-0 p-3 border-r border-[rgb(199,199,191)]">
            <ul className='flex flex-col items-center gap-8 max-w-full min-w-0'>
                <li className='text-neutral-900 text-center font-serif text-sm mt-3'>aesthetic reads</li>
                {SideBarData.map((val) => {
                    return (<li key={val.link}>
                        <Link className='focus:outline-2 focus:outline-blue-500 rounded-full' to={val.link}>
                            <img className="w-8 max-w-full min-w-0" src={val.icon} alt={val.alt} />
                        </Link>
                    </li>)
                })}
            </ul>
        </nav>
    )
}
