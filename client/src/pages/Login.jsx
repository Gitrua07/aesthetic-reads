import LoginComp from '../components/LoginComp';

export default function Login(){
    /**
     * Login:
     * This page contains the login contents.
     * It allows users to input a username and a 
     * password. It will let users navigate to the 
     * register page. When the user has inputted a correct
     * username and password, then the user will be
     * relocated to the Home.jsx page.
     * 
     * This page will contain the following components:
     * Login.jsx
     */
    return(
        <section className='m-20 flex flex-col justify-center justify-items-center text-center'>
            <LoginComp />
        </section>
    )
}