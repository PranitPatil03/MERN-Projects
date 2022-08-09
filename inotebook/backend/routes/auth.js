const express = require('express')

const router = express.Router()

router.get('/',(req, res) => {
    obj={
        Name:"Pranit",
        Number:29
    }
    res.send(obj)
})

module.exports=router