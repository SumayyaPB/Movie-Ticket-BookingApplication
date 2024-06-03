import USER from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const doSignUp = async(req,res)=>{
 
   try {
      const {firstName,lastName,email,password} = req.body
    
      const userExist = await USER.find({email})

      if(!userExist){
        return res.status(400).json({message:'User already exist'})
         
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password,saltRounds)

      const user = new USER({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        
      })
       await user.save()
       console.log(user);
      
      if(!user){
         return  res.status(400).json('user is not created')
      }
     
      res.status(201).json({ message: "successfully signed in!"});
    
   } catch (error) {
     console.log(error);
     return res.status(500).json('internal server error')
   }
}

const doLogin  = async (req,res)=>{
  try {
    const {email,password}=req.body

    const user = await USER.findOne({email})

    if(!user){
      return res.status(400).json({message:"User not exist"})
    }
    const matchPassword = await bcrypt.compare(password , user.password)

    if(!matchPassword){
      return res.status(400).json("incorrect password")
    }
  
    const token = jwt.sign({id : user.id},process.env.SECRET_KEY,{expiresIn:"1d"})
    res.cookie("token",token);
    res.status(200).json({message:"Logged In!"})
    } catch (error) {
    console.log(error);
    return res.status(500).json('internal server error')
  }
}



export {doSignUp,doLogin} 


