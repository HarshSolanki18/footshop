import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateToken,generateResetToken } from "../utils/generateToken.js";
import nodemailer from 'nodemailer';

//auth user and get token
// POST /api/users/login
// public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
  
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name=req.body.name||user.name
    user.email=req.body.email||user.email
    if(req.body.password){
      user.password=req.body.password
    }
    const updatedUser=await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})  


//creates a new user
// POST /api/users
// public

export const registerUser = asyncHandler(async (req, res) => {
  const { name,email, password } = req.body;

  const userExits = await User.findOne({ email });

  if(userExits){
    res.status(400);
    throw new Error('User already exists');
  }
  const user=await User.create({
    name,
    email,
    password
  })
  if(user){
    res.status(201)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }else{
    res.status(400)
    res.json('invalid user dqta')
  }
});

// @desc    forgot password profile
// @route   POST /api/users/forgot
// @access  Public

export const forgotPasswordMail=asyncHandler(async(req,res)=>{
  const email=req.body.email
  const user = await User.findOne({ email });
  if(!user){
    res.status(400);
    throw new Error('No user with that email');  
  }

  let transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.MAIL_ID, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  const token=generateResetToken(user._id)
  
  let info = await transporter.sendMail({
    from: 'hsolanki1884@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: "FOOTSHOP RESET PASSWORD", // Subject line
    text: `Here is the link to reset your password it will be valid only for 1 hour  http://localhost:3000/resetpassword/${token}`, // plain text body
    
  });
  if(info){
    res.json({
      message:"email has been sent to your mail id",
      info
    })
  }else{
    res.status(500);
    throw new Error('server error could not send your reset mail');  
  }
  
  
})