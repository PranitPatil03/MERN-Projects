const express = require('express')
const User= require('../Models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fetchuser= require('../middleware/fetchuser.js')

//This route create New User

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
      res.status(500).send("Server Error")
    }

})

//This route Authicate User

router.post('/login',[
  body('email').isEmail(),
  body('password','Password cannot be empty').exists()
], async (req, res) => {

  //This will check the error and return error message
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password}=req.body

  try {
    let user=await User.findOne({email})

    if(!user){
      return res.status(404).json({error:"Please Entre Correct Credinals"})
    }

    const passwordComp =await bcrypt.compare(password,user.password)

    if(!passwordComp){
      return res.status(404).json({error:"Please Entre Correct Credinals"})
    }

    const data={
      user:{
        id: user.id
      }
    }

    const token = jwt.sign(data, 'shhhhh')
    
    res.send({token})

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// This Route get User Details
router.post('/getuser',fetchuser, async (req, res) => {

  try {
    let userid=req.user.id
    const user=await User.findById(userid).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }


})

module.exports=router

