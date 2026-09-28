import LoginComp from '../components/LoginComp';
import { useAuth } from '../auth/AuthContext'
import { Navigate } from 'react-router-dom';
export default function Login() {
    /**
     * Login:
     * This page contains the login contents.
     * It allows users to input a username and a 
     * password. It will let users navigate to the 
     * register page. When the user has inputted a correct
     * username and password, then the user will be
     * relocated to the profile page.
     * 
     */

    const { isLoggedIn } = useAuth()

    return (
        <div>
            <title>Login - Aesthetic Reads</title>
            {isLoggedIn ? <Navigate to='/profile' replace/>: <section className='m-20 flex flex-col justify-center text-center'>
                <LoginComp />
            </section>}

        </div>
    )
}