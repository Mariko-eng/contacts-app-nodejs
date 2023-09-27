const asyncHandler = require("express-async-handler"); // Handle the try catch for us
const  bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel");

//@dec Register User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Exists!");
    }

    // Hash Password
    const hashpassword = await bcrypt.hash(password,10)

    const user = await User.create({
      username,
      email,
      password: hashpassword,
    });

    if(user){
        res.status(201).json({_id:user.id, email: user.email})
    }else{
        throw new Error("User Data Not Valid!");
    }
});

//@dec Login User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    const user = await User.findOne({ email });

    if(user && (await bcrypt.compare(password, user.password))){
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"100m"}
      );
      res.status(200).json(accessToken)
    }else{
      res.status(401)
      throw new Error("Wrong Email Or Password")
    }
});


//@dec Get User
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
