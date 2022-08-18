/* eslint-disable no-undef */
/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {

  const host = "http://localhost:8000"

  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //add the notes 

  const getNotes = async() => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNzlhNTZlMGU5MjY1YmFkN2Y4MWJjIn0sImlhdCI6MTY2MDM5NDA3MH0.zCx2qpdNBM-YT7ZI81fvXcYLHGqjgOAgaVeI-qg6G_A"
      },
    });
    const json = await response.json();
    setNotes(json);
  }

  const createNote = async(title, description, tag) => {

    const response = await fetch(`${host}/api/notes/createnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNzlhNTZlMGU5MjY1YmFkN2Y4MWJjIn0sImlhdCI6MTY2MDM5NDA3MH0.zCx2qpdNBM-YT7ZI81fvXcYLHGqjgOAgaVeI-qg6G_A"
      },

      body: JSON.stringify({title, description, tag})
    });
    // eslint-disable-next-line no-unused-vars
    const json = response.json();

    const note = {
      "_id": "62fb3084bd2a965092050317",
      "user": "62fb2ffdbd2a965092050311",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //edit the notes
  const editNote = async (id, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNzlhNTZlMGU5MjY1YmFkN2Y4MWJjIn0sImlhdCI6MTY2MDM5NDA3MH0.zCx2qpdNBM-YT7ZI81fvXcYLHGqjgOAgaVeI-qg6G_A"
      },

      body: JSON.stringify({title, description, tag})
    });
    // eslint-disable-next-line no-unused-vars
    const json = response.json();

    // eslint-disable-next-line no-unreachable
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index]; if (element._id === id)
        if (element._id === id) {
          element.id = id;
          element.description = description;
          element.tag = tag;
        }
    }
  }
  //delete the notes
  const deleteNote =async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNzlhNTZlMGU5MjY1YmFkN2Y4MWJjIn0sImlhdCI6MTY2MDM5NDA3MH0.zCx2qpdNBM-YT7ZI81fvXcYLHGqjgOAgaVeI-qg6G_A"
      },
      
    });
    // eslint-disable-next-line no-unused-vars
    const json=response.json();  
    console.log(json);

    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }

  return (
    <NoteContext.Provider value={{ notes, createNote, editNote, deleteNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState