import { AppError } from "./AppError.js"

export const asyncHandler = (func)=>{
  return (req,res,next)=>{
    func(req,res,next).catch (err=>{
      return next(new AppError(err, 500))
    })
  }
}