export default function SubmitBoard (props) {
    const classNameSelect = props.classNameSelect
    const onSubmit = props.onSubmit
    const selectedMoodBoard = props.selectedMoodBoard
    const setMoodBoard = props.setMoodBoard
    const moodBoardData = props.moodBoardData
    const classNameButton = props.classNameButton

    return (
        <form onSubmit={onSubmit}>
            <select
                className='rounded-xl bg-white '
                value={selectedMoodBoard}
                onChange={e => setMoodBoard}
            >
                {moodBoardData.map((val) => {
                    return (
                        <option key={val} value={val}>{val}</option>
                    )
                })}
            </select>
            <button type='submit' className='rounded-xl bg-white p-1'>Save</button>
        </form>
    )
}