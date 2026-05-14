import { SideBarData } from './SideBarData'
import { Link } from 'react-router-dom'

export default function SideBar() {
    /**
     * This component returns a side bar which
     * will contain the home and gallery button.
     */
    
    return (
        <div className="flex bg-[rgb(255,255,255)] h-screen w-[80px] p-3 border-r border-[rgb(199,199,191)]">
            <ul>
                {SideBarData.map((val, key) => {
                    return (<li key={key}>
                        <Link to={val.link}>
                            <img className="my-10 mx-2 w-8" src={val.icon} />
                        </Link>
                    </li>)
                })}
            </ul>
        </div>
    )
}
