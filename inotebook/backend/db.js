const mongoose = require('mongoose')

const  mongoURL="mongodb://localhost:27017/"

connectToDadatabase=()=>{
    mongoose.connect(mongoURL,()=>{console.log('connected to Database')});
}

module.exports=connectToDadatabase

