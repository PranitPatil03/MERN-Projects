const mongoose= require('mongoose')

const {Schema}=require('mongoose')

const NotesSchema = new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'user'
    },
    title:{
        type: 'string',
        required: true
    },
    description:{
        type: 'string',
        required: true,
    },
    tag:{
        type: 'string',
    },
    date:{
        type: 'date',
    }
})

const Note = mongoose.model('notes',NotesSchema)
module.exports=Note
