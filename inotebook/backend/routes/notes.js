const express = require('express')

const router = express.Router()

router.get('/',(req, res) => {
    obj={
        Name:"abc",
        Number:1212
    }
    res.send(obj)
})

module.exports=router