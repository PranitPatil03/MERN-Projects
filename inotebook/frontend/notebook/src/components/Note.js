
import React, { useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'

export const Note = () => {
    const context = useContext(noteContext)
    // eslint-disable-next-line no-unused-vars
    const { notes, createNote, getNotes } = context

    return (
        <div>
            <div className="row">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note.id} note={note} />
                })}
            </div>
        </div>
    )
}

