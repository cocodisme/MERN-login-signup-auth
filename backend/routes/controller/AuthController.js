const User = require("../../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const Signup = async (req, res) => {
  const { email, name, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashed });

  try {
    const saveuser = await newUser.save();
    const token = jwt.sign({_id: saveuser._id}, secret);
    return res.json({ success: true,token, message: "Registered Successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const verifyPassword = await bcrypt.compare(password, user.password);
    
    if (verifyPassword) {
      try {
        const token = jwt.sign({_id: user._id}, secret);
        return res.json({ success: true,token, message: "Logined Successfully" });
      } catch (error) {
        return res.status(500).send(error);
      }
    } else {
      return res.json({ success: false, message: "Incorrect Password" });
    }
  } else {
    return res.json({ success: false, message: "User not found" });
  }
};
const readME = async (req, res) => {
  const token  = req.headers['authorization']
  const decoded = jwt.verify(token,secret)
  const users = await User.findOne({_id:decoded._id});
  try {
    return res.json({success:true,message:users});
  } catch (error) {
    return res.status(500).send(error);
  }
};
//admin
const readAllUsers = async (req, res) => {
  const users = await User.find({});

  try {
    return res.json(users);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {Signup,Login,readME,readAllUsers}
