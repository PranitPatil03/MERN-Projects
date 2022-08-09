const mongoose= require('mongoose')

const NotesSchema = new Schema({
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

module.exports = mongoose.model('notes',NotesSchema)