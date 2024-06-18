
// import jwt from "jsonwebtoken";
// import "dotenv/config";


// const authenticateUser = (req, res, next)=> {
// const token = req.cookies.token;
// try {
  
//   jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
//     console.log(err);

//     if (err) return res.sendStatus(403);

//     req.user = user;
//     console.log(req.user.role);

//     next();
//   });
// } catch (error) {
//   console.log(error);
//   res.status(500).json('Internal server error')
// }
// }

// export default authenticateUser;

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided", success: false });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(403).json({ message: "Invalid token", success: false });
    }

    req.user = user;
    next();
  });
}

export default authenticateUser;
