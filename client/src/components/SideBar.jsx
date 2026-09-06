import { SideBarData } from './SideBarData'
import { Link } from 'react-router-dom'

export default function SideBar() {
    /**
     * This component returns a side bar which
     * will contain the home and gallery button.
     */
    //text-neutral-900 text-center mt-6 text-sm mb-1 font-serif
    //flex justify-center
    return (
        <div className="flex bg-[rgb(255,255,255)] min-h-screen w-[80px] max-w-full min-w-0 p-3 border-r border-[rgb(199,199,191)]">
            <ul className='flex flex-col items-center gap-8'>
                <li className='text-neutral-900 text-center font-serif'>aesthetic reads</li>
                {SideBarData.map((val, key) => {
                    return (<li className='' key={key}>
                        <Link to={val.link}>
                            <img className="w-8 max-w-full min-w-0" src={val.icon} />
                        </Link>
                    </li>)
                })}
            </ul>
        </div>
    )
}
