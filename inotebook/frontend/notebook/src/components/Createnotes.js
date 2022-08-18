import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

function Createnotes() {

    const context = useContext(noteContext)
    const {createNote} = context

    const [note,setNotes]=useState({title:"",description:"",tags:""})

    const handleClick=(e) =>{
        e.preventDefault()
        createNote(note.title,note.description,note.tags)
    }
    const handleChange=(e)=>{
        setNotes({...note,[e.target.name]:e.target.value})
    }

    return (
        <div className="container my-3">
            <h2>Add your Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Create New Note</button>
            </form>
        </div>
    )
}

export default Createnotes