const mongoose= require('mongoose')

const {Schema}=require('mongoose')

const UserSchema = new Schema({
    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true,
    },
    date:{
        type: 'date',
    }
})

const User=mongoose.model('User',UserSchema)
User.createIndexes()
module.exports = User

