const  jwt = require('jsonwebtoken')

const secret="shhhhh"

fetchuser=(req,res,next)=>{
    const token=req.header("auth-token")
    if(!token){
        res.status(401).send({error:"Access denied"})
    }
    try{
        const data=jwt.verify(token,secret)
        req.user=data.user
    }
    catch(error){
        res.status(401).send({error:"Access denied"})
    }

    next()
}

module.exports=fetchuser
