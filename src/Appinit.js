
import authRouter from './modules/auth/auth.router.js';
import cartRouter from './modules/cart/cart.router.js';
import categoryRouter from './modules/category/category.router.js';
import orderRouter from './modules/order/order.router.js';
import reviewRouter from './modules/review/review.router.js';
import userRouter from './modules/user/user.router.js';
import subcategoryRouter from './modules/subcategory/subcategory.router.js';
import cors from 'cors'
export const Appinit = ( app,express )=>{
    app.use(express.json());
    app.use(cors()); 
    app.get('/', (req,res)=>{
        return res.status(200).json({message:"Welcome"})
     }) 
    app.use('/auth', authRouter);
    app.use('/user', userRouter)
    // app.use('/book', bookRouter);
    app.use('/subcategory', subcategoryRouter)
    app.use('/cart', cartRouter);
    app.use('/category', categoryRouter);
    app.use('/order', orderRouter);
    app.use('/review', reviewRouter);

    app.get('*', (req,res)=>{
        return res.status(404).json({message:"page not found"})
     })
}