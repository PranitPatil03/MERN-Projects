const express = require('express')
const User= require('../Models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

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
      const salt=await bcrypt.genSalt(10)
      const securePassword=await bcrypt.hash(req.body.password,salt)
      
        user=await User.create({
          name: req.body.name,
          email: req.body.email,
          password: securePassword,
        })

        const data={
          user:{
            id: user.id
          }
        }

        const token = jwt.sign(data, 'shhhhh')
        
        res.send({token})

    } catch (error) {
      console.error(error.message)
      res.status(500).send("Some Error Occecued")
    }

})

module.exports=router