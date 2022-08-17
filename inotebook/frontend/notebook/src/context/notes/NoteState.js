/* eslint-disable react/jsx-pascal-case */
import { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState=(props)=>{

    const notes=[
        {
          "_id": "62fb3072bd2a965092050315",
          "user": "62fb2ffdbd2a965092050311",
          "title": "monday",
          "description": "apple is best but mango anda rjjgerigerg",
          "tag": "exam",
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
    
    const [, setNotes]=useState()

    return(
        <NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState