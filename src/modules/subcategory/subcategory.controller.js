import slugify from "slugify";
import { CategoryModel } from "../../../DB/models/category.model.js";
import cloudinary from './../../utls/cloudinary.js';
import { subcategoryModel } from "../../../DB/models/subcategory.model.js";

// export const Create = async(req,res)=>{
//     req.body.name = req.body.name.toLowerCase();
//     if(await CategoryModel.findOne({name:req.body.name})){
//         return res.staus(409).json({message:"category already exists"})
//     } 
//     req.body.slug = slugify(req.body.name);
//     const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{folder:'ecommerce/categories'});
//     req.body.image = {secure_url, public_id}; 
//     const category = await CategoryModel.create(req.body);
//     return res.json({message:"success",category})
// }

export const Create = async (req, res) => {
    const {CategoryId} = req.body;
    const Category = await CategoryModel.findById(CategoryId);
    if(!Category){
        return res.status(404).json({ message: "category not found" });
    }
        if (!req.file) {
            return res.status(400).json({ message: "No file attached" });
        }

        req.body.name = req.body.name.toLowerCase();
        if (await subcategoryModel.findOne({ name: req.body.name })) {
            return res.status(409).json({ message: "subCategory already exists" });
        }

        req.body.slug = slugify(req.body.name);

        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.AppName}/categories` });
        req.body.image = { secure_url, public_id };
        req.body.createdBY = req.user._id;
        req.body.updatedBY = req.user._id;
        const Createdcategory = await subcategoryModel.create(req.body); 

        return res.json({ message: "success", Createdcategory });
}
  
export const getAll = async (req,res)=>{
    const {id} = req.params;
    const subCategories = await subcategoryModel.find({CategoryId:id}).populate([{
        path:'createdBY',
        select:'username'
    },{
        path:'updatedBY',
        select:'username'
    }])
     
    return res.status(200).json({message:'success', subCategories});
}

export const getActive = async (req,res)=>{
    const categories = await CategoryModel.find({status:'active'}).select('name image');
    return res.status(200).json({message:'success', categories});
}  

export const getDetails = async (req,res)=>{
    const category = await CategoryModel.findById(req.params.id);
    return res.status(200).json({message:'success', category})
}

export const update = async (req,res)=>{
    const category = await CategoryModel.findById(req.params.id);
    if(!category){
        return res.status(404).json({message:"category not found"})
    }
    category.name = req.body.name.toLowerCase();
    if(await CategoryModel.findOne({name:req.body.name, _id:{$ne:req.params.id}})){
        return res.status(409).json({message:"category already exists"});
    }
    category.slug = slugify(req.body.name);
    if(req.file){
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ecommerce/categories'
        });
        cloudinary.uploader.destroy(category.image.public_id);
        category.image = {secure_url,public_id};
    }

    category.status = req.body.status;
    await category.save();
    return res.status(200).json({message:'success',category});
} 

export const Delete = async (req,res)=>{
    const {id} = req.params;
    const category = await CategoryModel.findById(id);
    if(!category){
        return res.status(404).json({message:"category not found"});
    }
    await cloudinary.uploader.destroy(category.image.public_id);
    await CategoryModel.findByIdAndDelete(id);
    return res.status(200).json({message:"success"});
}