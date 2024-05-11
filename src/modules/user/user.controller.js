import { UserModel } from "../../../DB/models/user.model.js"


export const getAll = async (req,res)=> {
    const users = await UserModel.find();
    return res.status(200).json({message:"success",users});
}

export const Disable = async (req,res)=> {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    if(user.status === 'Disabled'){
        return res.status(400).json({message:"user already disabled"});
    }
    const Disabled = await UserModel.findByIdAndUpdate(user.id, {status: 'Disabled'}, {new: true});
    return res.status(200).json({message:"success",Disabled});
    
}
 
export const Activate = async (req,res)=> {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    if(user.status === 'Activated'){
        return res.status(400).json({message:"user already Activated"});
    }
    const Activated = await UserModel.findByIdAndUpdate(user.id, {status: 'Activated'}, {new: true});
    return res.status(200).json({message:"success",Activated});
    
}  