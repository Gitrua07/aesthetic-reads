export default function BookCard(props){
    /**
     * This component returns a display
     * of the book which will be listed on the 
     * BookList components.
     */
    return(
        <article className="w-40">
            <img className="rounded-xl w-80" src={props.src}/>
            <div>{props.title}</div>
            {/*If you hover over it then the below UI should appear */}
            <div>
                list of the available mood board
                Save
            </div> 
            {/* */}
        </article>
    )
}