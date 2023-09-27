const asyncHandler = require("express-async-handler"); // Handle the try catch for us
const Contact = require("../models/contactModel");

//@dec Get All Contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@dec Get All Contacts
//@route GET /api/contacts
//@access private
const getUserContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ createdBy: req.user.id });
  res.status(200).json(contacts);
});

//@dec Create Contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    createdBy: req.user.id,
  });
  res.status(201).json(contact);
});

//@dec Get Contact
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});

//@dec Update Contact
//@route PUT /api/contacts
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.createdBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User does not have permission to update other user's contact"
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@dec Delete Contact
//@route DELETE /api/contacts
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.createdBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User does not have permission to delete other user's contact"
    );
  }

  await contact.deleteOne({_id: req.params.id})
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getUserContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
