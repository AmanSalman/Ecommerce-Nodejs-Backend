import mongoose, {Schema, model} from "mongoose";


const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		min: 3,
		max: 20
	},
	email: {
		type: String,
		required: true,
		unique: true,
		// default:null --> we can't have more than one row to have a null value
	},
	password: {
		type: String,
		required: true
	},
	image: {
		type: Object
	},
	phone: {
		type: String
	},
	address: {
		type: String
	},
	confirmEmail: {
		type: Boolean,
		default: false
	},
	gender: {
		type: String,
		enum: ['Male', 'Female']
	},
	status: {
		type: String,
		default: 'Activated',
		enum: ['Activated', 'Disabled']
	},
	role: {
		type: String,
		default: 'User',
		enum: ['User', 'Admin']
	}
}, 

{timestamps: true});


export const UserModel = model('User',UserSchema);
