import { UserModel } from "../../DB/models/user.model.js";
import jwt from 'jsonwebtoken';

export  const roles = {
    Admin:'Admin',
    User:'User'
}
export const auth = (accessRole = [])=>{
    return async (req,res,next)=>{
        const {authorization} = req.headers;
        if(!authorization || !authorization.startsWith(process.env.BEARERTOKEN)){
            return res.status(400).json({message:"invalid token"});
          } 

        const token = authorization.split(process.env.BEARERTOKEN)[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        if(!decoded) {
            return res.status(401).json({message:"unauthorized"});
        }

        const user = await UserModel.findById(decoded.id).select("username role");
        if(!user) {
            return res.status(401).json({message:"user not found"});
        } 
        
        if(!accessRole.includes(user.role)) {
            return res.status(403).json({message:"unauthorized role"});
        }
        
        req.user = user;
        return next();

    }
}
