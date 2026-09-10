import { useAuth } from '../auth/AuthContext'

export default function Dashboard(){
    const { authUser,
        setAuthUser,
        isLoggedIn,
        setLoggedIn } = useAuth()

        const LogIn = (e) => {
            e.preventDefault()
            setAuthUser(
                'Billy'
            )
            setLoggedIn(true)
        }

        const LogOut = (e) => {
            e.preventDefault()
            setAuthUser(null)
            setLoggedIn(false)
        }

    return (
        <div>
            {isLoggedIn ? <div>Logged In</div>: <div>Logged Out</div>}
            {authUser ? <div>{authUser} is logged in</div>: null}
            {isLoggedIn ? <button onClick={(e) => LogOut(e)}>Log Out</button>: <button onClick ={e => LogIn(e)}>Log In</button>}
        </div>
    )
}

