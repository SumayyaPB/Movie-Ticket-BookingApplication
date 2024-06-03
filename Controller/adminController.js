import ADMIN from "../model/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const signUp = async(req,res)=>{
    console.log('hitted')
    try {
        const {TheaterName,location,email,password,} = req.body
        console.log(email)
        const adminExist = await ADMIN.findOne({email})
        console.log(adminExist)
        if(adminExist){
            return res.status(400).json('user already exist')
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        
        const adminUser = new ADMIN({
            TheaterName,
            location,
            email,
            password: hashedPassword,
            role: 'TheaterOwner'
        })
        await adminUser.save()
        console.log(adminUser)
        if(!adminUser){
            res.status(400).json('user is not created')
        }
       
        res.status(201).json({message:" Successfully Signed"})
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})
    }

}
const signIn = async(req,res)=>{
    try {
        const {email , password} = req.body
    const adminUser = await ADMIN.findOne({email})
    
    if(!adminUser){
        res.status(400).json({message:"Invalid User"})
    }
    const matchPassword = await bcrypt.compare(password, adminUser.password)
    if(!matchPassword){
        res.status(400).json({error : "Incorrect password"})
    }
    const payload = { 
        id :adminUser.id ,
        role : adminUser.role
    }
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: '1d'})
    res.cookie("token", token);
    res.status(200).json({message:"Logged In", adminUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'}) 
    }
   
}
const getProfile = async(req,res)=>{
    console.log('hitted')
    try {
        const adminUsers = await ADMIN.find({});
    if (!adminUsers){
        res.status(400).json('Users not found')
    }
    res.status(200).json(adminUsers)
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})  
    }
}

const updateProfile = async(req,res)=>{
    try {
        const adminUser = await ADMIN.findByIdAndUpdate(req.params.id , req.body ,{new: true})
    if(!adminUser){
        res.status(400).json('User not found')
    }
    res.status(200).json(adminUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})  
    }
}

const deleteProfile = async(req,res)=>{
    try {
        const id = req.params.id ;
        const adminUser = await ADMIN.findByIdAndDelete(id, req.body ,{new:true})
    if(!adminUser){
        res.status(400).json('User not found')
    }
    res.status(200).json({message:'Successfully deleted'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error : 'Internal Server Error'})  
    }
}

export {signUp,signIn,getProfile,updateProfile,deleteProfile}