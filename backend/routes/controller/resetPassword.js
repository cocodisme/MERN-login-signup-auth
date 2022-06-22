const User = require("../../models/user.js");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");

const clientURL = process.env.CLIENT_URL;

const resetLink = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user == null) {
    return res.json({ success: false, message: "Email doesn't exist" });
  }
  if (user) {
    let token = jwt.sign({ email }, secret);
    let expiry = new Date(Date.now() + 1 * 3600 * 1000);
    User.findOneAndUpdate(
      { email },
      { $set: { resetToken: token, resetExpire: expiry } },
      { new: true, ReturnDocument: "after" },
      (err, updated) => {
        if (err) return res.json({ success: false, message: "server error" });

        const data = {
          name: updated.name,
          email,
          resetlink: `${clientURL}/resetpassword/${token}`,
        };
        return res.json({ success: true, message: data });
      }
    );
  }
};
const verifyPasswordToken = async (req, res, next) => {
  let token = req.params.token;
  jwt.verify(token, secret, async (err, data) => {
    if (err)
      return res.json({ success: false, message: "invalid link or expired" });

    let user = await User.findOne({ email: data.email });
    if (!user)
      return res.json({ success: false, message: "Invalid link or expired" });

    if (user) {
      
      const expire = user.resetExpire > Date.now();
      if (!expire)
      return res.json({ success: false, message: "invalid link or expired" });
      res.json({ success: true, message: "verified" });
    } else res.json({ success: false, message: "invalid link or expired" });
  });
};

const verifyAndUpdatePassword = async (req, res, next) => {
  const passregx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,16}$/;
  const { password } = req.body;
  if (passregx.test(password) == false) {
    return res.json({
      success: false,
      message:
        "Password must contain atleast 1 special character,one number and must be between 3-16 character",
    });
  }
  const hashed = await bcrypt.hash(password, 10);
  let token = req.params.token;
  jwt.verify(token, secret, async (err, data) => {
    

    if (err)
      return res.json({ success: false, message: "invalid link or expired" });

    let user = await User.findOne({ email: data.email });
    if (!user)
      return res.json({ success: false, message: "Invalid link or expired" });

    if (user) {
      const expire = user.resetExpire > Date.now();
      if (!expire)
      return res.json({ success: false, message: "invalid link or expired" });
      const newData = {
    password:hashed,
    resetToken:"1",
    resetExpire: {date:"1"}
      }
      let updatedData = await User.findOneAndUpdate(
        { email: data.email },
        newData,
        { ReturnDocument: "after" }
      );
      res.json({ success: false, message: "password updated successfully" });
    } else res.json({ success: false, message: "invalid link or expired" });
  });
};

module.exports = { resetLink, verifyAndUpdatePassword, verifyPasswordToken };
