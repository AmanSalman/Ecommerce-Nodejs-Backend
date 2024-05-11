import jwt from 'jsonwebtoken';
import { UserModel } from './../../../DB/models/user.model.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invaild email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invaild password' });
        }

        const token = jwt.sign({ id: user._id, role:user.role,status:user.status }, process.env.JWT_SECRET); 
        return res.status(200).json({ message: 'success', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const register = async (req, res) => {
    const { username, email, password,phone } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));
        const newUser = await UserModel.create({ username, email, password: hashedPassword,phone });
        if (!newUser) {
            return res.status(500).json({ message: 'Error while creating user' });
        }
        return res.status(201).json( { message: 'success', newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
