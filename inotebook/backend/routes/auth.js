const express = require('express')
const User= require('../Models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fetchuser= require('../middleware/fetchuser.js')
const JWT_SECRET="pranit"

//This route create New User

router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    // res.json(user)
    res.json({ authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


//This route Authicate User

router.post('/login',[
  body('email').isEmail(),
  body('password','Password cannot be empty').exists()
], async (req, res) => {

  let success=false;

  //This will check the error and return error message
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password}=req.body

  try {
    let user=await User.findOne({email})

    if(!user){
      success=false
      return res.status(404).json({success,error:"Please Entre Correct Credinals"})
    }

    const passwordComp =await bcrypt.compare(password,user.password)

    if(!passwordComp){
      success=false
      return res.status(404).json({success,error:"Please Entre Correct Credinals"})
    }

    const data={
      user:{
        id: user.id
      }
    }

    const token = jwt.sign(data, 'shhhhh')
    success=true
    res.send({success,token})

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

