import { Link } from 'react-router-dom'

export default function LoginComp() {
    /**
     * This component returns the UI
     * of the login page.
     */

    return (
        <div className="flex flex-col gap-6">
            <h1>Login</h1>
            <form action='/user-info' method='get'>
                <div>
                    <label for='username'>Username: </label>
                    <input className='border px-1 ml-2 rounded-md' type='text' name='username' id='username' required />
                </div>
                <div>
                    <label for='password'>Password:</label>
                    <input className='px-1 border ml-4 my-4 rounded-md' type='text' name='password' id='password' require />
                </div>
                <button type='submit' className="font-medium border px-2 py-1 rounded-xl">Submit</button>
            </form>
            <div>
                <div>No account?</div>
                <Link to='/register'>
                    <div className='font-medium'>Register</div>
                </Link>
            </div>
        </div>
    )
}