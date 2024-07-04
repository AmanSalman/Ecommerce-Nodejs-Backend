import mongoose, { Schema, Types, model } from "mongoose";
//ctrl + H

const ProductSchema = new Schema ({
    name:{
        type:String,
        required:true,
        unique:true
    },
    MainImage:{
        type:Object,
        require:true
    },
    subImage:[{
        type:Object,
    }],
    slug:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        default:1
    },
    status: {
		type: String,
		default: 'active',
		enum: ['active', 'inactive']
	},
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    description:{
        type:String,
        required:true
    },
    FinalPrice:{
        type:Number,
    },
    sizes:{
        type:String,
        enum:['S','M','L','XL']
    },
    colors:[String],
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true
    },
    subcategory:{
        type:Types.ObjectId,
        ref:'subcategory',
        required:true
    },
    createdBY:{ 
        type:Types.ObjectId,
        ref:'Admin',
        // required:true
    },
    updatedBY:{
        type:Types.ObjectId,
        ref:'Admin',
        // required:true
    }
},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},

})

ProductSchema.virtual('Reviews', {
    ref:'Review',
    localField:'_id',
    foreignField:'productId'
})

export const ProductModel = model('Prodcut', ProductSchema);