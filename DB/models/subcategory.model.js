import mongoose, { Schema, Types, model } from "mongoose";
//ctrl + H

const SubCategorySchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:Object
    },
    slug:{
        type:String,
        required:true
    },
    status: {
		type: String,
		default: 'active',
		enum: ['active', 'inactive']
	},
    createdBY:{ 
        type:Types.ObjectId,
        ref:'User',
        // required:true
    },
    updatedBY:{
        type:Types.ObjectId,
        ref:'User',
        // required:true
    },
    CategoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true
    }
})


export const subcategoryModel = model('subcategory', SubCategorySchema);