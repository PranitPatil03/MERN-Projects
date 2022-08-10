const express = require('express')
const User= require('../Models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()


router.post('/createUser',[
    body('email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
      let user=await User.findOne({email:req.body.email})

      if(user){
        return res.status(400).json({errors: "Email already registered"})
      }
  
        user=await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        })
  
        res.json(user) 
    } catch (error) {
      console.error(error.message)
      res.status(500).send("Some Error Occecued")
    }

})

module.exports=router