import express from "express";
import User from "../mongodb/models/user.js";

const router = express.Router();

router.route("/signup").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      res.status(200).json({ success: false, message: "exist" });
    } else if (!checkUser) {
      const newUser = await User.create({
        email: email,
        password: password,
      });
      res
        .status(200)
        .json({ success: true, message: "not exist", data: newUser });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Unable to create contact user" });
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      res.status(200).json({ success: false, message: "not exist" });
    } else if (checkUser) {
      res
        .status(200)
        .json({ success: true, message: "exist", data: checkUser });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Unable to create contact user" });
  }
});

router.route("/update").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOneAndUpdate({ email:email },{ $set: { password: password } })
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: "cannot change the password!" });
  }
});

export default router;
