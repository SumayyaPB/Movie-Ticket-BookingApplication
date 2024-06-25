import USER from "../model/userModel.js";
import  mongoose  from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const doSignUp = async(req,res)=>{
 console.log(req.body)
   try {
      const {firstName,lastName,email,password,city} = req.body
    
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
        city,
        password:hashedPassword,
        role : 'user'
        
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
   const payload = {id : user.id, role : user.role}
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1d"})
    res.cookie("token",token);
    res.status(200).json({message:"Logged In!"})
    } catch (error) {
    console.log(error);
    return res.status(500).json('internal server error')
  }
}
 

const checkLogin = async (req, res) => {
  try {
    const user = req.user;
    console.log("role ", user.role)

    console.log("Authenticated user ID:", user.id);


    // const findUser = await USER.findById({ id: user.id });
    const findUser = await USER.findOne({ _id: new mongoose.Types.ObjectId(user.id) });

    if (!findUser) {
      return res.status(401).json({ message: "Authentication failed", success: false });
    }

    res.json({ message: "User authenticated", success: true });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

const getUser = async(req,res)=>{
  try {
    const getUser = await USER.find({})
    if(!getUser){
     res.status(400).json('Not found the user')
    }
    res.status(200).json(getUser)
 } catch (error) {
  console.log(error);
  res.status(500).json('Internal server error')
 }
}
const changeCity = async(req,res)=>{
  try {
    const {city}= req.body
    const user = await USER.findOne({_id: req.userId})

    if(!user){
      return res.status(400).json("Invalid Credential")
    }else{
      user.city = city
      await user.save();
      return res.status(200).json({message:"city changed successfully"})
    }
    
  } catch (error) {
    console.log(error);
     res.status(500).json('Internal server error')
  }
}

const logOut = async(req,res)=>{
  try {
    res.clearCookie("token")
  res.status(200).json({messgae:"user Loggout successfully"})
  } catch (error) {
    console.log(error);
     res.status(500).json('Internal server error')
  }
}





export {doSignUp,doLogin,checkLogin,getUser,logOut,changeCity} 


