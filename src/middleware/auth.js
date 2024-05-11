import { UserModel } from "../../DB/models/user.model.js";
import jwt from 'jsonwebtoken';

export const auth = ()=>{
    return async (req,res,next)=>{
        const {authorization} = req.headers;
        if(!authorization || !authorization.startsWith(process.env.BEARERTOKEN)){
            return res.status(400).json({message:"invalid authorization"});
          } 

        const token = authorization.split(process.env.BEARERTOKEN)[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        if(!decoded) {
            return res.status(401).json({message:"unauthorized2"});
        }

        const user = await UserModel.findById(decoded.id).select("username");
        if(!user) {
            return res.status(401).json({message:"user not found"});
        } 

        req.user = user;
        next();

    }
}