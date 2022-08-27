
import React, { useContext} from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import { useNavigate } from 'react-router-dom';

export const Note = () => {
    const context = useContext(noteContext)
    // eslint-disable-next-line no-unused-vars
    const { notes, createNote, getNotes } = context
    const navigate = useNavigate()

    if(localStorage.getItem('token')){
        getNotes()
    }
    else{
        navigate('/login')
    }
   
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

