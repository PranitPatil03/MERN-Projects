/* eslint-disable no-undef */
/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {

  const [, setNotes] = useState()

  const notes= [
 
    {
      "_id": "62fb3084bd2a965092050317",
      "user": "62fb2ffdbd2a965092050311",
      "title": "friday",
      "description": "fsdfsdfdsf is best but mango andad rjjgerigerg",
      "tag": "fsf",
      "__v": 0
    },
    {
      "_id": "62fb3084bd2a965092050317",
      "user": "62fb2ffdbd2a965092050311",
      "title": "friday",
      "description": "fsdfsdfdsf is best but mango andad rjjgerigerg",
      "tag": "fsf",
      "__v": 0
    },
    {
      "_id": "62fb3084bd2a965092050317",
      "user": "62fb2ffdbd2a965092050311",
      "title": "friday",
      "description": "fsdfsdfdsf is best but mango andad rjjgerigerg",
      "tag": "fsf",
      "__v": 0
    },
    {
      "_id": "62fb3084bd2a965092050317",
      "user": "62fb2ffdbd2a965092050311",
      "title": "friday",
      "description": "fsdfsdfdsf is best but mango andad rjjgerigerg",
      "tag": "fsf",
      "__v": 0
    },
    {
      "_id": "62fb3084bd2a965092050317",
      "user": "62fb2ffdbd2a965092050311",
      "title": "friday",
      "description": "fsdfsdfdsf is best but mango andad rjjgerigerg",
      "tag": "fsf",
      "__v": 0
    }
  ]




  //add the notes 

  const CreateNote = (title, description, tag) => {

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
  const editNote = () => {

  }
  //delete the notes
  const deleteNote = () => {

  }

  return (
    <NoteContext.Provider value={{notes,CreateNote,editNote,deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState