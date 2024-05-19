import slugify from "slugify";
import { ProductModel } from "../../../DB/models/product.model.js";
import { CategoryModel } from "../../../DB/models/category.model.js";
import { subcategoryModel } from './../../../DB/models/subcategory.model.js';
import cloudinary from './../../utls/cloudinary.js';
export const create = async (req,res)=>{
    const {name, price, discount, categoryId, subcategory}= req.body;
    
    const checkCategory = await CategoryModel.findById(categoryId);
    if(!checkCategory){
        return res.status(404).json({message:"category not found"})
    }
    
    const checkSub = await subcategoryModel.findOne({_id: subcategory, CategoryId: categoryId});
    if(!checkSub){
        return res.status(404).json({message:"subcategory not found"})
    }

    req.body.slug = slugify(name);
    let finalprice = price - (((discount || 0)/100)*price);
    req.body.FinalPrice = finalprice;

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.MainImage[0].path,{folder: `${process.env.AppName}/product/${name}`});
    req.body.MainImage = {secure_url,public_id};

    req.body.subImage = [];
    for(const file of req.files.subImage){
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder: `${process.env.AppName}/product/${name}/subImages`});
        req.body.subImage.push({secure_url,public_id});
    }

    const product = await ProductModel.create(req.body);
    return res.status(200).json({message:"success",product})
}