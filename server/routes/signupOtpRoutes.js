import express from "express";
import * as dotenv from "dotenv";
import nodemailer from "nodemailer";
import User from "../mongodb/models/user.js";
dotenv.config();

const router = express.Router();

const sendEmail = (recipient_email, OTP) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
      from: process.env.MY_EMAIL, 
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "OTP to verify email",
      html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
        <meta charset="UTF-8">
        <title>CodePen - OTP Email Template</title>
        
      </head>
      <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <p style="font-size:1.1em">Hii,</p>
          <p>Use the following OTP to Complete email verification Procedure.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
          <p style="font-size:0.9em;">Regards,<br />Uma</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>GIFT,BBSR</p>
            <p>Odisha</p>
          </div>
        </div>
      </div>
      <!-- partial -->
        
      </body>
      </html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
};
router.route("/send").post(async (req, res) => {
  const {Email,Otp} = req.body;
  try {
    const checkUser = await User.findOne({ email: Email });
    if (checkUser===null) {
      await sendEmail(Email, Otp);
      res.status(200).json({ success: true,message:'otp-sent'});
    }else if(checkUser !== null){
      res.status(200).json({success: false, message: 'found'});
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
