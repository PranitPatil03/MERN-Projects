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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmZjFhOWVkZWYxMGRmNTY2MGVmY2U1In0sImlhdCI6MTY2MDg4NTY2Mn0.FzW4UhNVqqP69dSMnKdIjYry9DgHvwbcYFeBdiWi6XA"
      },
    });
    const json = await response.json();
    setNotes(json);
  }

  const createNote = async(title, description, tag) => {

    // eslint-disable-next-line no-unused-vars
    const response = await fetch(`${host}/api/notes/createnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmZjFhOWVkZWYxMGRmNTY2MGVmY2U1In0sImlhdCI6MTY2MDg4NTY2Mn0.FzW4UhNVqqP69dSMnKdIjYry9DgHvwbcYFeBdiWi6XA"
      },

      body: JSON.stringify({title, description, tag})
    });
    // eslint-disable-next-line no-unused-vars

    const note={
      "user": "62ff1a9edef10df5660efce5",
      "title": title,
      "description": description,
      "tag": tag,
      "_id": "62ff1af7def10df5660efce9",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //edit the notes
  // const editNote1 = async (id, description, tag) => {

  //   // eslint-disable-next-line no-unused-vars
  //   const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmZjFhOWVkZWYxMGRmNTY2MGVmY2U1In0sImlhdCI6MTY2MDg4NTY2Mn0.FzW4UhNVqqP69dSMnKdIjYry9DgHvwbcYFeBdiWi6XA"
  //     },

  //     body: JSON.stringify({title, description, tag})
  //   });
  //   // eslint-disable-next-line no-unused-vars

  //   const newNotes = JSON.parse(JSON.stringify(notes))
  //   // Logic to edit in client
  //   for (let index = 0; index < newNotes.length; index++) {
  //     const element = newNotes[index];
  //     if (element._id === id) {
  //       newNotes[index].title = title;
  //       newNotes[index].description = description;
  //       newNotes[index].tag = tag; 
  //       break; 
  //     }
  //   }  
  //   setNotes(newNotes);
  // }

  
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmZjFhOWVkZWYxMGRmNTY2MGVmY2U1In0sImlhdCI6MTY2MDg4NTY2Mn0.FzW4UhNVqqP69dSMnKdIjYry9DgHvwbcYFeBdiWi6XA"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }



  //delete the notes
  const deleteNote =async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmZjFhOWVkZWYxMGRmNTY2MGVmY2U1In0sImlhdCI6MTY2MDg4NTY2Mn0.FzW4UhNVqqP69dSMnKdIjYry9DgHvwbcYFeBdiWi6XA"
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