import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import Createnotes from './Createnotes'
import Noteitem from './Noteitem'

function Notes() {
    const context = useContext(noteContext)

    const { notes} = context

    return (
        <>
        <Createnotes/>
            <div className="row">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem note={note} />
                })}
            </div>
        </>

    )
}

export default Notes