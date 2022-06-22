//u-update, d-delete
const User = require("../../models/user.js");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const UpdateData = async (req,res)=>{
  const token  = req.headers['authorization']
  const decoded = jwt.verify(token,secret)
  
  User.findOneAndUpdate({_id: decoded._id},req.body, {new: true}, (err, doc) => {
    if (err) {
        res.json({success:false,message:"Something wrong when updating data!"})
    }
    res.json({success:true,message:"updated successfully"})
    
});
}
const DeleteData = async (req,res)=>{
  let id = req.params.id;
  
  User.deleteOne({_id: id}, (err, doc) => {
    if (err) {
        res.json({success:false,message:"Something wrong when deleting data!"})
    }
    res.json({success:true,message:"successfully deleted"})
    
});
}
// @access local

module.exports = {UpdateData,DeleteData}