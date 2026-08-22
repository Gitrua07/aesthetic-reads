import axios from 'axios'
export default function SubmitBoard(props) {
    const {
        handleMoodBoard, // matches BookCard prop
        selectedMoodBoard,
        setMoodBoard,
        moodBoardData = [],
        classNameSelect = '',
        classNameButton = '',
    } = props

    return (
        <form className='flex gap-3' onSubmit={handleMoodBoard}>
            <select
                className={`rounded-xl min-w-[70px] bg-white ${classNameSelect}`}
                value={selectedMoodBoard}
                onChange={e => setMoodBoard(e.target.value)}
            >
                {moodBoardData.map((val) => (
                    <option key={val} value={val}>{val}</option>
                ))}
            </select>
            <button type='submit' className={`rounded-xl bg-white p-1 ${classNameButton}`}>Save</button>
        </form>
    )
}