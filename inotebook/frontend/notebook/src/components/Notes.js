import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import Createnotes from './Createnotes'
import Noteitem from './Noteitem'
import { useNavigate } from 'react-router-dom';

function Notes() {
    const context = useContext(noteContext)
    const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const { notes, createNote, getNotes,editNote } = context

    useEffect(() => {

        // getNotes()

        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate('/login')
        }
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [note, setNotes] = useState({id:"",  etitle: "", edescription: "", etag: "" })

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
    }
    const handleChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }

    const updatenote = (currentNote) => {
        ref.current.click()
        // setNotes({id:currNote._id, etitle:currNote.title,edescription:currNote.description,etag:currNote.tag})
        setNotes({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const ref = useRef(null)
    const refClose=useRef(null)

    return (
        <>
            <Createnotes />
            <button style={{ display: 'none' }} type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Your Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  aria-describedby="emailHelp" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription}  onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag}  onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} onClick={handleClick} data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <h2>Your Notes</h2>
                <div>{notes.length===0 && "No Notes to Display"}</div>
                {notes.map((note) => {
                    return <Noteitem key={note.id} updatenote={updatenote} note={note} />
                })}
            </div>
        </>

    )
}

export default Notes