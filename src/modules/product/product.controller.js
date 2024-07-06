import slugify from "slugify";
import { ProductModel } from "../../../DB/models/product.model.js";
import { CategoryModel } from "../../../DB/models/category.model.js";
import { subcategoryModel } from './../../../DB/models/subcategory.model.js';
import cloudinary from './../../utls/cloudinary.js';
import { pagination } from "../../utls/pagination.js";

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
    if(req.files.subImage){
        for(const file of req.files.subImage){
            const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder: `${process.env.AppName}/product/${name}/subImages`});
            req.body.subImage.push({secure_url,public_id});
        } 
    }

    const product = await ProductModel.create(req.body);
    return res.status(200).json({message:"success",product})
}


export const getProducts = async (req, res) => {
    const { skip, limit } = pagination(req.query.page, req.query.limit);
    let queryObject = { ...req.query };
    const execQuery = ['page', 'limit'];

    execQuery.forEach(ele => {
        delete queryObject[ele];
    });

    queryObject = JSON.stringify(queryObject);
    queryObject = queryObject.replace(/gt|gte|lt|lte|in|nin|eq/g, match => `$${match}`);
    queryObject = JSON.parse(queryObject);

    // Add condition for stock greater than 0
    queryObject.stock = { $gt: 0 };

    const mongooseQuery = ProductModel.find(queryObject).limit(limit).skip(skip)
        .populate({
            path: 'Reviews',
            populate: {
                path: 'user'
            }
        });

    if (req.query.search) {
        mongooseQuery.find({
            $or: [
                { name: { $regex: req.query.search } },
                { description: { $regex: req.query.search } }
            ]
        });
    }
    const count = await ProductModel.estimatedDocumentCount();
    mongooseQuery.select(req.query.fields);

    let products = await mongooseQuery.sort(req.query.sort);

    // Map products and transform as needed
    products = products.map(product => ({
        ...product.toObject(),
        image: product.MainImage.secure_url,
        subImage: product.subImage.map(img => img.secure_url)
    }));

    return res.status(200).json({ message: "success", count, products });

     // const products = await ProductModel.find().populate({
    //     path:'Reviews',
    //     populate:{
    //        path: 'user'
    //     }})
    // return res.status(200).json({message:"success", products})
};



export const getDetails = async (req, res) => {
    const product = await ProductModel.findById(req.params.id).populate({
        path:'Reviews',
        populate:{
            path: 'user'
        }
    })
    return res.status(200).json({message:"success", product})
}
