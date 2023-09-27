const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Add The Username"],
    },
    email: {
      type: String,
      required: [true, "Please Add The Email Address"],
      unique: [true, "Email Addrss Already Taken"],
    },
    password: {
      type: String,
      required: [true, "Please Add The Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
