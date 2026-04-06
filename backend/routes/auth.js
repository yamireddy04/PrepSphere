const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
router.post("/register", async (req,res)=>{
  try{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
      return res.status(400).json({message:"All fields required"});
    }

    const existing = await User.findOne({email});
    if(existing){
      return res.status(400).json({message:"Email already exists"});
    }

    const hashed = await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      password:hashed
    });

    await user.save();

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    );

    res.status(201).json({token});

  }catch(err){
    res.status(500).json({message:"Server error"});
  }
});

router.post("/login", async (req,res)=>{
  try{
    const {email,password} = req.body;

    if(!email || !password){
      return res.status(400).json({message:"All fields required"});
    }

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"Invalid credentials"});
    }

    const match = await bcrypt.compare(password,user.password);
    if(!match){
      return res.status(400).json({message:"Invalid credentials"});
    }

    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    );

    res.json({token});

  }catch(err){
    res.status(500).json({message:"Server error"});
  }
});

module.exports = router;