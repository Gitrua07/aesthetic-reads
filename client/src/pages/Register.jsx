export default function Register(){
    /**
     * Register:
     * This page contains the register page. 
     * The user will be able to create a new account here.
     * 
     * This page will not have a component and be implemented
     * on this page.
     */

    return(
        <section className="flex flex-col gap-6 justify-center justify-items-center text-center m-10 h-full">
            <h1>Register</h1>
            <form action='/user-info' method='post'>
                <div>
                    <label for='name'>Name: </label>
                    <input className="px-1 border ml-12 my-4 rounded-md" type='text' name='name' id="name" required/>
                </div>
                <div>
                    <label for='username'>Username: </label>
                    <input className="px-1 border ml-4 my-4 rounded-md" type='text' name='username' id="username" required/>
                </div>
                <div>
                    <label for='email'>Email: </label>
                    <input className="px-1 border ml-12 my-4 rounded-md" type='email' name='email' id='email' required />
                </div>
                <div>
                    <label for='password'>Password: </label>
                    <input className="px-1 border ml-5 my-4 mb-6 rounded-md" type='password' name='password' id='password' required />
                </div>
                <button type='submit' className="font-medium border px-2 py-1 rounded-xl">Submit</button>
            </form>
        </section>
    )
}