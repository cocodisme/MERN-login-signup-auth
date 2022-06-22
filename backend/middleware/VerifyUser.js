const User = require("../models/user")
const jwt = require('jsonwebtoken')
const secret= process.env.JWT_SECRET

const VerifyUser = async (req,res,next)=>{
  const token  = req.headers['authorization']
  if (token=="null" || !token) 
 {return res.json({success:false,message:'unauthorised'})}
  else{
  const decoded = jwt.verify(token,secret)
  const user = await User.findOne( {_id:decoded._id})
    if (!user) return res.json({success:false,message:"Not allowded"})
  if(user) next()
 }
}
const VerifyVendor = async (req,res,next)=>{
  const token  = req.headers['authorization']
  if (token=="null"||!token) 
 {return res.json({success:false,message:'unauthorised'})}
  else{
  const decoded = jwt.verify(token,secret)
  const user = await User.findOne( {_id:decoded._id})
    if (!user) return res.json({success:false,message:"Not allowded"})
  if(user.Role == "vendor") {next()}
  else{res.json({success:false,message:"Not allowded"})}
  }
}
const VerifyAdmin = async (req,res,next)=>{
  const token  = req.headers['authorization']
  if (token=="null"||!token) 
 {return res.json({success:false,message:'unauthorised'})}
  else{
  const decoded = jwt.verify(token,secret)
  const user = await User.findOne( {_id:decoded._id})
    if (!user) return res.json({success:false,message:"Not allowded"})
  if(user.Role == "admin") {next()}
  else{return res.json({success:false,message:"Not allowded"})}
  }
}

module.exports = {VerifyUser,VerifyAdmin,VerifyVendor}