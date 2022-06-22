const User = require("../models/user")
const Emailregx =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passregx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,16}$/;

const validator = (req,res,next)=>{
  const {email,name,password} = req.body
  
  if (Emailregx.test(email) == false) {return res.json({ success: false, message: "Invalid Email" })} ;
  
  if (name.length > 15 || name.length < 3) {return res.json({ success: false, message: "Username must be between 3-15 characters" })} ;
  
  if (passregx.test(password) == false) {return res.json({ success: false, message: "Password must contain atleast 1 special character,one number and must be between 3-16 character" })}
  next()
}

const AlreadyExist = async (req,res,next)=>{
  const {email,name} = req.body
  const user = await User.findOne({ $or:[ {email}, {name} ]})
        if(user){return res.json({ success: false, message: "Username or Email is Already Exist" })}else {
          next()
        }
}
module.exports = {validator,AlreadyExist}
