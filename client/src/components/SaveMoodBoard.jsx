import SubmitBoard from "./SubmitBoard"

const BookCover = ({ imageSrc }) => <img className='h-100 rounded-xl' src={imageSrc} alt='cover of book' />

export default function SaveMoodBoard (props) {
    const moodBoardData = props.moodBoardData
    const imageSrc = props.imageSrc
    const handleMoodBoard = props.handleMoodBoard
    const selectedMoodBoard = props.selectedMoodBoard
    const setMoodBoard = props.setMoodBoard

    return (
        <div className="bg-red-1 mr-5 mt-5 pr-5 pt-5">
            <BookCover imageSrc={imageSrc} />
            <div className="flex gap-5 mt-5 ">
                <div className="font-light">
                    Mood Board:
                </div>
                <SubmitBoard
                    classNameSelect='px-3 border rounded-xl'
                    onSubmit={handleMoodBoard}
                    selectedMoodBoard={selectedMoodBoard}
                    setMoodBoard={setMoodBoard}
                    moodBoardData={moodBoardData}
                    classNameButton='font-medium rounded-xl bg-white border px-3'
                />
            </div>
        </div>
    )
}