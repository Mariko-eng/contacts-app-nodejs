const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Add Contact Name"],
    },
    email: {
      type: String,
      required: [true, "Please Add Email Address"],
    },
    phone: {
      type: String,
      required: [true, "Please Add Phone Number"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required : true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema)