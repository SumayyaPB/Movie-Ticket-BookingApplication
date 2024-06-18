import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authenticateTheaterOwner = (req,res,next)=>{
   const token = req.cookies.token;
   jwt.verify(token , process.env.SECRET_KEY , (err,user)=>{

    console.log(err);

    if(err) return res.sendStatus(403);

    req.user= user;
    console.log(req.user.role);
    if(req.user.role !== 'TheaterOwner' && req.user.role !== 'Admin'){
        return res.send('not Authenticated')
    }
    next()

   })
}

const authenticateAdmin = (req,res,next)=>{
    const token = req.cookies.token;

    jwt.verify(token , process.env.SECRET_KEY , (err,user)=>{
        console.log(err);

        if(err) return res.sendStatus(403)
        
        req.user = user
        console.log(req.user.role);  

        if(req.user.role !== 'Admin' ){
            return res.send('not authenticated')
        }
       next() ;
    })

}

export {authenticateTheaterOwner,authenticateAdmin}