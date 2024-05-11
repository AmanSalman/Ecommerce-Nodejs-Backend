import mongoose, { Schema, Types, model } from "mongoose";
//ctrl + H

const CategorySchema = new Schema ({
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
    }
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})

CategorySchema.virtual('subcategory',{
    ref:'subcategory',
    localField:'_id',
    foreignField:'CategoryId'
});


export const CategoryModel = model('Category', CategorySchema);