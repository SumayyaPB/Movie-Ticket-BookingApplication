
import jwt from "jsonwebtoken";
import "dotenv/config";


const authenticateUser = (req, res, next)=> {
const token = req.cookies.token;
try {
  
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;
    console.log(req.user.role);

    next();
  });
} catch (error) {
  console.log(error);
  res.status(500).json('Internal server error')
}
}

export default authenticateUser;;